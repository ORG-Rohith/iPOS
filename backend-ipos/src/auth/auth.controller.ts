import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './users/dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestUser } from './users/types/jwt-payload.type';
import { CurrentUser } from './decorators/current-user.decorator';
import { EmailService } from 'src/common/email/email.service';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './users/users.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // POST /api/v1/auth/login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // GET /api/v1/auth/me
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: RequestUser) {
    return { user };
  }

  // to send otp to the user email for passwordless login or 2FA
  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    const otp = this.authService.generateOtp(email);
    if (!otp) {
      return { message: 'Failed to generate OTP' };
    }

    await this.emailService.sendOtp(email, await otp);

    return { message: 'OTP sent' };
  }

  //to verify the otp sent to the user email

  @Post('verify-otp')
  verifyOtp(@Body() body) {
    const { email, otp } = body;

    const valid = this.authService.verifyOtp(email, otp);

    if (!valid) {
      return { message: 'Invalid OTP' };
    }

    return { message: 'OTP verified' };
  }

  @Post('send-reset-link')
  async sendResetLink(@Body('email') email: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      return { message: 'If email exists, link sent' }; // security
    }
    // const token = Math.random().toString(36).substring(2);

    // const link = `http://localhost:3000/reset-password?token=${token}`;

    // await this.emailService.sendResetLink(email, link);
    const token = Math.random().toString(36).substring(2);

    user.reset_token = token;
    user.reset_token_expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await this.userRepo.save(user);

    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.emailService.sendResetLink(email, link);
    this.logger.log(`🔗 Reset link generated for ${email}: ${link}`);

    return { message: 'Reset link sent' };
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    const user = await this.userRepo.findOne({
      where: { reset_token: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    // 🔥 CHECK EXPIRY
    if (user.reset_token_expiry < new Date()) {
      throw new BadRequestException('Token expired');
    }

    // ✅ Update password
    user.password_hash = await bcrypt.hash(newPassword, 10);

    // ✅ Clear token after use
    user.reset_token = null;
    user.reset_token_expiry = null;

    await this.userRepo.save(user);

    return { message: 'Password reset successful' };
  }
}

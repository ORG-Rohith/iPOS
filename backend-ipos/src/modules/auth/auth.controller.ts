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
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { EmailService } from 'src/infrastructure/email/email.service';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import * as bcrypt from 'bcrypt';
import { AUTH_MESSAGES } from 'src/shared/constants/messages';
import { RequestUser } from 'src/modules/users/types/jwt-payload.type';
import { User } from 'src/modules/users/entity/users.entity';
import { LoginDto } from 'src/modules/users/dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      this.logger.error('Login failed', error.stack);
      throw new BadRequestException(
        error.message || AUTH_MESSAGES.LOGIN_FAILED,
      );
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: RequestUser) {
    return { user };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  logout(@CurrentUser() user: RequestUser) {
    this.logger.log(`User logged out: ${user.email}`);
    return { message: AUTH_MESSAGES.LOGOUT_SUCCESS };
  }

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    try {
      const otp = this.authService.generateOtp(email);

      if (!otp) {
        throw new BadRequestException(AUTH_MESSAGES.OTP_FAILED);
      }

      await this.emailService.sendOtp(email, await otp);

      return { message: AUTH_MESSAGES.OTP_SENT };
    } catch (error) {
      this.logger.error('Send OTP failed', error.stack);
      throw new InternalServerErrorException(
        error.message || AUTH_MESSAGES.GENERIC_ERROR,
      );
    }
  }

  @Post('verify-otp')
  verifyOtp(@Body() body) {
    try {
      const { email, otp } = body;

      const valid = this.authService.verifyOtp(email, otp);

      if (!valid) {
        throw new BadRequestException(AUTH_MESSAGES.OTP_INVALID);
      }

      return { message: AUTH_MESSAGES.OTP_VERIFIED };
    } catch (error) {
      this.logger.error('Verify OTP failed', error.stack);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        AUTH_MESSAGES.OTP_VERIFY_FAILED,
      );
    }
  }

  @Post('send-reset-link')
  async sendResetLink(@Body('email') email: string) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });

      if (!user) {
        return { message: AUTH_MESSAGES.RESET_LINK_SENT };
      }

      const token = Math.random().toString(36).substring(2);

      user.reset_token = token;
      user.reset_token_expiry = new Date(Date.now() + 15 * 60 * 1000);

      await this.userRepo.save(user);

      const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

      await this.emailService.sendResetLink(email, link);

      this.logger.log(`Reset link generated for ${email}`);

      return { message: AUTH_MESSAGES.RESET_LINK_SENT };
    } catch (error) {
      this.logger.error('Send reset link failed', error.stack);
      throw new InternalServerErrorException(
        AUTH_MESSAGES.RESET_LINK_FAILED,
      );
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    try {
      const user = await this.userRepo.findOne({
        where: { reset_token: token },
      });

      if (!user) {
        throw new BadRequestException(AUTH_MESSAGES.INVALID_TOKEN);
      }

      if (user.reset_token_expiry < new Date()) {
        throw new BadRequestException(AUTH_MESSAGES.TOKEN_EXPIRED);
      }

      user.password_hash = await bcrypt.hash(newPassword, 10);

      user.reset_token = null;
      user.reset_token_expiry = null;

      await this.userRepo.save(user);

      return { message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESS };
    } catch (error) {
      this.logger.error('Reset password failed', error.stack);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        AUTH_MESSAGES.PASSWORD_RESET_FAILED,
      );
    }
  }
}
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entity/users.entity';

import { UsersService } from 'src/modules/users/users.service';
import { LoginDto } from 'src/modules/users/dto/login.dto';
import { UserRole } from '../user-roles/entity/user-roles.entity';
import { JwtPayload, JwtUserRole } from 'src/modules/users/types/jwt-payload.type';

@Injectable()
export class AuthService {
  private otpStore = new Map();
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,

    private readonly jwtService: JwtService,
    private readonly usersservice: UsersService,
  ) { }

  // ─────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Find user by email
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['tenant'],
    });

    // 2. User not found
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3. Check active status
    if (!user.is_active) {
      throw new UnauthorizedException(
        'Your account is deactivated. Contact admin.',
      );
    }

    // 4. Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 5. Load roles and permissions in parallel
    const [roles, permissions] = await Promise.all([
      this.getUserRoles(user.id),
      this.getUserPermissions(user.id),
    ]);

    // 6. Build JWT payload
    const payload: JwtPayload = {
      sub: user.id,
      uuid: user.uuid,
      email: user.email,
      tenantId: user.tenant_id ?? null,
      roles,
      permissions,
    };

    // 7. Sign token
    const accessToken = this.jwtService.sign(payload);

    this.logger.log(`User logged in: ${user.email}`);

    return {
      accessToken,
      tokenType: 'Bearer',
      user: {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        name: user.name,
        tenantId: user.tenant_id ?? null,
        tenantName: user.tenant?.name ?? null,
        roles,
        permissions,
      },
    };
  }

  // ─────────────────────────────────────────
  // GET USER ROLES
  // ─────────────────────────────────────────
  private async getUserRoles(userId: number): Promise<JwtUserRole[]> {
    const userRoles = await this.userRoleRepo.find({
      where: { user_id: userId },
      relations: ['role', 'outlet'],
    });

    return userRoles.map((ur) => ({
      roleId: ur.role.id,
      roleName: ur.role.name,
      outletId: ur.outlet_id ?? null,
    }));
  }

  // ─────────────────────────────────────────
  // GET USER PERMISSIONS
  // ─────────────────────────────────────────
  private async getUserPermissions(userId: number): Promise<string[]> {
    const userRoles = await this.userRoleRepo.find({
      where: { user_id: userId },
      relations: ['role', 'role.permissions', 'role.permissions.permission'],
    });

    const permissionSet = new Set<string>();

    userRoles.forEach((ur) => {
      ur.role?.permissions?.forEach((rp) => {
        if (rp.permission?.code) {
          permissionSet.add(rp.permission.code);
        }
      });
    });

    return Array.from(permissionSet);
  }

  // ─────────────────────────────────────────
  // VALIDATE USER (used by JwtStrategy)
  // ─────────────────────────────────────────
  async validateUserById(id: number): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id, is_active: true },
      relations: ['tenant'],
    });
  }

  // Otp generation and verification (for passwordless login or 2FA)

  async generateOtp(email: string) {
    if (!email) {
      throw new UnauthorizedException('Email is required for OTP generation');
    }
    const isEmail = await this.usersservice.findByEmail(email);
    if (!isEmail) {
      throw new UnauthorizedException('No user found with this email');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    this.otpStore.set(email, {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    });

    return otp;
  }

  // For demonstration, OTP verification is simple. In production, consider using a more robust solution.

  verifyOtp(email: string, otp: string) {
    const data = this.otpStore.get(email);

    if (!data) return false;
    if (Date.now() > data.expires) return false;
    if (data.otp !== otp) return false;

    this.otpStore.delete(email);
    return true;
  }
  async findmyemail(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }
}

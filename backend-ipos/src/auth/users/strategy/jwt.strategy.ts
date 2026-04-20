import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../auth.service';
import { JwtPayload, RequestUser } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!, // ✅ directly from .env
    });
  }

  async validate(payload: JwtPayload): Promise<RequestUser> {
    const user = await this.authService.validateUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found or deactivated');
    }

    return {
      id: payload.sub,
      uuid: payload.uuid,
      email: payload.email,
      tenantId: payload.tenantId,
      roles: payload.roles,
      permissions: payload.permissions,
    };
  }
}
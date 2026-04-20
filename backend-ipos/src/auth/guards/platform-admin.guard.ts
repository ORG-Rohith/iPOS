import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RequestUser } from '../users/types/jwt-payload.type';

@Injectable()
export class PlatformAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user: RequestUser = context.switchToHttp().getRequest().user;

    // Only Super Admin has tenantId = null
    if (user.tenantId !== null) {
      throw new ForbiddenException(
        'Access denied. Only Platform Admin can perform this action.',
      );
    }

    return true;
  }
}

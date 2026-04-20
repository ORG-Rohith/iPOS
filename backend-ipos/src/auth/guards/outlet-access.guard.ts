import {
  Injectable, CanActivate,
  ExecutionContext, ForbiddenException,
} from '@nestjs/common';
import { RequestUser } from '../users/types/jwt-payload.type';

@Injectable()
export class OutletAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: RequestUser = request.user;

    // Super Admin — full access
    if (user.tenantId === null) return true;

    // Tenant Admin — outletId is null on role = all outlets
    const isTenantAdmin = user.roles.some((r) => r.outletId === null);
    if (isTenantAdmin) return true;

    // Outlet-level check
    const outletId =
      Number(request.params?.outletId) ||
      Number(request.body?.outletId);

    if (!outletId) return true;

    const hasAccess = user.roles.some((r) => r.outletId === outletId);

    if (!hasAccess) {
      throw new ForbiddenException(
        'You do not have access to this outlet',
      );
    }

    return true;
  }
}
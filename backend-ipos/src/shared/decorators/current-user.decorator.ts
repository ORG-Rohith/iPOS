import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from 'src/modules/users/types/jwt-payload.type';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestUser => {
    return ctx.switchToHttp().getRequest().user;
  },
);
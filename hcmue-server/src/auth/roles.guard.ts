import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LoggedInGuard } from './logged-in.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard extends LoggedInGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());
    if (!roles) {
      return true;
    }
    const req = ctx.getContext().req;
    const user = req.session.passport?.user;

    return super.canActivate(context) && roles.includes(user.role);
  }
}

import {
  CanActivate,
  ExecutionContext,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const requiredRole = this.reflector.getAllAndOverride('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (request.user.role !== requiredRole)
      throw new HttpException(
        `You must be an ${requiredRole} to access`,
        HttpStatus.FORBIDDEN,
      );

    return true;
  }
}

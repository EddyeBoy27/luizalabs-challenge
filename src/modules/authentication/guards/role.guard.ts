import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

const matchRoles = (requiredRole: string[], userRoles: string[]) => {
  return userRoles.some((userRole) => requiredRole.includes(userRole));
};

@Injectable()
export class RolesGuard implements CanActivate {
  reflector: Reflector;

  constructor(private authService: AuthService) {
    this.reflector = new Reflector();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const decoded = await this.authService.validateUserToken(token);

      if (!decoded || !decoded.roles) {
        return false;
      }
      return matchRoles(roles, decoded.roles);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

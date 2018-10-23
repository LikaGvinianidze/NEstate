import { NestMiddleware, MiddlewareFunction, Injectable } from '@nestjs/common';

@Injectable()
export class HasOrganization implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (request, response, next) => {
      const user = request.user;
      if (!user || !user.organization) {
        return response.redirect('/organizations/select-organization');
      }
      next();
    };
  }
}

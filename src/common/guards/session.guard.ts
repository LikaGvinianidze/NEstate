import { CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';

export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    if (!request.session.passport || _.isEmpty(request.session.passport.user)) {
      response.status(HttpStatus.UNAUTHORIZED).redirect('/auth/login');
      return false;
    } else {
      return true;
    }
  }
}

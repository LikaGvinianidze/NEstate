import { ErrorCode } from './../config/message-code';
import { MessageCodeError } from './../errors/error-message-code';
import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as passport from 'passport';

export class AppAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = { ...defaultOptions };
    const httpContext = context.switchToHttp();
    const [request, response] = [
      httpContext.getRequest(),
      httpContext.getResponse(),
    ];
    const passportFn = createPassportContext(request, response);

    const user = await passportFn(
      'local',
      options,
    );
    if (user) {
      request.login(user, (res) => { });
    }

    return true;
  }
}

const createPassportContext = (request, response) => (type, options) =>
  new Promise((resolve, reject) =>
    passport.authenticate(type, options, (err, user, info) => {
      try {
        return resolve(options.callback(err, user, info));
      } catch (err) {
        return reject(err);
      }
    })(request, response, resolve),
  );

const defaultOptions = {
  session: true,
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  property: 'user',
  callback: (err, user, info) => {
    if (err || !user) {
      throw err || new MessageCodeError(ErrorCode.REQUEST_UNAUTHORIZED);
    }
    return user;
  },
};

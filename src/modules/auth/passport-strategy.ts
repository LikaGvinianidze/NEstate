import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { MessageCodeError } from './../../common/errors/error-message-code';
import { ErrorCode } from './../../common/config/message-code';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy.Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, email: string, password: string, done: Function) {
    try {
      const user = await this.authService.validateUser({ email, password });

      if (!user) {
        return done(new MessageCodeError(ErrorCode.REQUEST_UNAUTHORIZED), false);
      }
      done(null, user);
    } catch (error) {
      switch (error.messageCode) {
        case ErrorCode.USER_NOT_FOUND: return done(new MessageCodeError(ErrorCode.USER_NOT_FOUND));
        case ErrorCode.PASSWORD_NOT_MATCH: return done(new MessageCodeError(ErrorCode.PASSWORD_NOT_MATCH));
      }
    }
  }
}

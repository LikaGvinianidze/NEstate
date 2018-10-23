import { NestMiddleware, MiddlewareFunction, Injectable } from '@nestjs/common';

@Injectable()
export class SetNull implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (request, response, next) => {
      const body = request.body;
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          if (body[key] === '') {
            delete body[key];
          }
        }
      }
      request.body = body;
      next();
    };
  }
}

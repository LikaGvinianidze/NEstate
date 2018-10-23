import { MessageCodeError } from './../errors/error-message-code';
import { HttpException, Catch, ExceptionFilter, HttpStatus, ArgumentsHost } from '@nestjs/common';

@Catch(MessageCodeError, HttpException, Error)
export class DispatchError implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    console.log(exception)
    if (exception instanceof MessageCodeError) {
      res.setHeader('x-message-code-error', exception.messageCode);
      res.setHeader('x-message', exception.message);
      res.setHeader('x-httpStatus-error', exception.status);

      return res.status(exception.status).json({ message: exception.message });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();

      return res.status(status).json(exception.message.message);
    } else if (exception instanceof Error) {
      res.setHeader('x-message-code-error', exception.name);
      res.setHeader('x-message', exception.message);
      res.setHeader('x-httpStatus-error', 500);

      return res.status(HttpStatus.BAD_REQUEST).send();
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}

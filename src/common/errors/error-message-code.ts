import { getErrorMessage } from './../config/error-message';
import { ErrorCode } from './../config/message-code';

export class MessageCodeError extends Error {
  public messageCode: ErrorCode;
  public status: number;
  public errorMessage: string;

  constructor(messageCode: ErrorCode) {
    super();
    const errorMessageConfig = getErrorMessage(messageCode);
    if (!errorMessageConfig) throw new Error('Unable to find message code error.');

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = errorMessageConfig.httpStatus;
    this.messageCode = messageCode;
    this.errorMessage = errorMessageConfig.errorMessage;
    this.message = errorMessageConfig.userMessage;
  }
}

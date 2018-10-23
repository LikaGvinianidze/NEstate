import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './interfaces/error-message.interface';
import { ErrorCode } from './message-code';

/**
 * @description: Find the error config by the given message code.
 * @param {ErrorCode} messageCode
 * @return {IErrorMessages}
 */
export const getErrorMessage = (messageCode: ErrorCode): IErrorMessages => {
  let message: IErrorMessages;

  switch (messageCode) {
    case ErrorCode.USER_CREATE_MISSING_CREDINTIALS:
      message = {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user with missing information.',
        userMessage: 'Unable to create a new user with missing information.',
      };
      break;

    case ErrorCode.USER_CREATE_MISSING_FIRSTNAME:
      message = {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without first name.',
        userMessage: 'Unable to create a new user without first name.',
      };
      break;

    case ErrorCode.USER_CREATE_MISSING_LASTNAME:
      message = {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without last name.',
        userMessage: 'Unable to create a new user without last name.',
      };
      break;

    case ErrorCode.USER_CREATE_MISSING_EMAIL:
      message = {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without email address.',
        userMessage: 'Unable to create a new user without email address.',
      };
      break;

    case ErrorCode.USER_CREATE_MISSING_PASSWORD:
      message = {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without password.',
        userMessage: 'Unable to create a new user without password.',
      };
      break;

    case ErrorCode.USER_CREATE_EMAIL_EXIST:
      message = {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user with this email.',
        userMessage: 'აღნიშნული ელ-ფოსტით მონაცემი მეორდება.',
      };
      break;

    case ErrorCode.USER_RUD_MISSING_ID:
      message = {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to do this action, caused by missing information.',
        userMessage: 'Unable to do this action, caused by missing information.',
      };
      break;

    case ErrorCode.USER_NOT_FOUND:
      message = {
        type: 'notFound',
        httpStatus: HttpStatus.NOT_FOUND,
        errorMessage: 'Unable to found the user with the provided information.',
        userMessage: 'Unable to found the user with the provided information.',
      };
      break;

    case ErrorCode.REQUEST_UNAUTHORIZED:
      message = {
        type: 'unauthorized',
        httpStatus: HttpStatus.UNAUTHORIZED,
        errorMessage: 'Access unauthorized.',
        userMessage: 'Access unauthorized.',
      };
      break;

    case ErrorCode.AUTH_LOGIN_MISSING_EMAIL:
      message = {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the user without email.',
        userMessage: 'Unable to connect the user without email.',
      };
      break;

    case ErrorCode.AUTH_LOGIN_MISSING_PASSWORD:
      message = {
        type: 'BadRequest',
        httpStatus: HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the user without password.',
        userMessage: 'Unable to connect the user without password.',
      };
      break;

    case ErrorCode.NOT_IN_SESSION:
      message = {
        type: 'BadRequest',
        httpStatus: HttpStatus.UNAUTHORIZED,
        errorMessage: 'No Session',
        userMessage: 'Session Expired',
      };
      break;
    case ErrorCode.PASSWORD_NOT_MATCH:
      message = {
        type: 'BadRequest',
        httpStatus: HttpStatus.UNAUTHORIZED,
        errorMessage: 'Password does not match',
        userMessage: 'Incorrect Password',
      };
      break;
  }

  return message;
};

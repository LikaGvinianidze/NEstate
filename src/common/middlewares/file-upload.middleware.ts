import { Injectable } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common/interfaces/middlewares';
import * as multer from 'multer';

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
  resolve(): (req, res, next) => void {
    const upload = multer({ dest: '../../../uploads/' });
    return upload.any();
  }
}

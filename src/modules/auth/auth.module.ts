import { AppAuthGuard } from './../../common/guards/app-auth.guard';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStrategy } from './passport-strategy';
import { CookieSerializer } from './cookie-serialize';
import { AuthController } from './auth.controller';

@Module({
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    HttpStrategy,
    AppAuthGuard,
    CookieSerializer,
  ],
})
export class AuthModule {}

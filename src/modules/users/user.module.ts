import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { userProvieder } from './user.provider';
import { UserService } from './user.service';
import { DatabaseModule } from './../database/database.module';
import { SetNull } from './../../common/middlewares/set-null-value.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [userProvieder, UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SetNull)
      .forRoutes(UserController);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './common/config/config';
import {
  AuthModule,
  RoleModule,
  UserModule,
  OrganizationModule,
  StateModule,
  ContactModule,
} from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({...config.database}),
    AuthModule,
    RoleModule,
    UserModule,
    OrganizationModule,
    StateModule,
    ContactModule,
  ],
})
export class AppModule {}

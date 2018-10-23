import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { roleProvieder } from './role.provider';
import { RoleService } from './role.service';
import { DatabaseModule } from './../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [roleProvieder, RoleService],
})
export class RoleModule {}

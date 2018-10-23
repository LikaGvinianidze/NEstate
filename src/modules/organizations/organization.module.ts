import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { organizationProvieder } from './organization.provider';
import { DatabaseModule } from './../database/database.module';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { SetNull } from './../../common/middlewares/set-null-value.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [organizationProvieder, OrganizationService],
})
export class OrganizationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SetNull)
      .forRoutes(OrganizationController);
  }
}

import { Module, MiddlewareConsumer } from '@nestjs/common';
import { StateController } from './state.controller';
import { stateProvieder } from './state.provider';
import { StateService } from './state.service';
import { DatabaseModule } from '../database/database.module';
import { HasOrganization } from './../../common/middlewares/has-organization.middleware';
import { SetNull } from './../../common/middlewares/set-null-value.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [StateController],
  providers: [stateProvieder, StateService],
})
export class StateModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply([HasOrganization, SetNull])
      .forRoutes(StateController);
  }
}

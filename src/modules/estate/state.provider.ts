import { State } from './entities/state.entity';
import { Connection } from 'typeorm';

export const stateProvieder = {
  provide: 'StateRepository',
  useFactory: (connection: Connection) => connection.getRepository(State),
  inject: ['DbConnectionToken'],
};

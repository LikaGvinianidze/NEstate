import { User } from './entities/user.entity';
import { Connection } from 'typeorm';

export const userProvieder = {
  provide: 'UserRepository',
  useFactory: (connection: Connection) => connection.getRepository(User),
  inject: ['DbConnectionToken'],
};

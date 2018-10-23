import { Role } from './entities/role.entity';
import { Connection } from 'typeorm';

export const roleProvieder = {
  provide: 'RoleRepository',
  useFactory: (connection: Connection) => connection.getRepository(Role),
  inject: ['DbConnectionToken'],
};

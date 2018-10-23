import { Contact } from './entities/contact.entity';
import { Connection } from 'typeorm';

export const contactProvieder = {
  provide: 'ContactRepository',
  useFactory: (connection: Connection) => connection.getRepository(Contact),
  inject: ['DbConnectionToken'],
};

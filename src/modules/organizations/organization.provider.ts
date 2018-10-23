import { Organization } from './entities/organization.entity';
import { Connection } from 'typeorm';

export const organizationProvieder = {
  provide: 'OrganizationRepository',
  useFactory: (connection: Connection) => connection.getRepository(Organization),
  inject: ['DbConnectionToken'],
};

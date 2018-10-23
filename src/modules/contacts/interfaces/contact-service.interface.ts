import { Contact } from './../entities/contact.entity';
import { Organization } from './../../organizations/entities/organization.entity';

export interface IContactService {
  findAll(organization: Organization, page): Promise<Array<Contact>>;
  findById(organization: Organization, id: number): Promise<Contact>;
  create(credentials: any): Promise<Contact>;
  update(id: number, credentials: any): Promise<Contact>;
  delete(id): Promise<void>;
}
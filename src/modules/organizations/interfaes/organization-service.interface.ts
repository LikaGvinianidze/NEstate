import { Organization } from './../entities/organization.entity';
import { IOrganization } from './organization.interface';

export interface IOrganizationService {
  findAll(page: number): Promise<Array<Organization>>;
  findById(id: number): Promise<Organization | null>;
  create(creadintials: IOrganization): Promise<Organization>;
  update(id: number, creadintials: IOrganization): Promise<Organization>;
  delete(id: number): Promise<void>;
}

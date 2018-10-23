import { Organization } from './../../organizations/entities/organization.entity';
import { User } from './../../users/entities/user.entity';
import { State } from './../../estate/entities/state.entity';

export interface IContact {
  firstname: string;
  lastname: string;
  phone?: string;
  email?: string;
  birth_date?: Date;
  contact_person?: string;
  org_name?: string;
  comment?: string;
  contact_status: string;
  contact_type: string;
  source: string;
  organization: Organization;
  user: User;
  // state?: State;
}
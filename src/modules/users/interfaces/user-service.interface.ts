import { Organization } from './../../organizations/entities/organization.entity';
import { IUser } from './user.interface';
import { User } from './../entities/user.entity';

export interface IUserService {
  findAll(page: number, organization: Organization): Promise<Array<User>>;
  findById(id: number, organization: Organization): Promise<User | null>;
  create(creadintials: IUser): Promise<User>;
  update(id: number, creadintials: IUser): Promise<User>;
  delete(id: number): Promise<void>;
  search(name: string, page: number): Promise<Array<User>>;
}

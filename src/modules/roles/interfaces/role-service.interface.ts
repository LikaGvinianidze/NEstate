import { IRole } from './role.interface';
import { Role } from './../entities/role.entity';

export interface IRoleService {
  findAll(page: number): Promise<Array<Role>>;
  findById(id: number): Promise<Role | null>;
  create(creadintials: IRole): Promise<Role>;
  update(id: number, creadintials: IRole): Promise<Role>;
  delete(id: number): Promise<void>;
}

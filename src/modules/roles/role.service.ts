import { IRole } from './interfaces/role.interface';

import { Injectable, Inject } from '@nestjs/common';
import { IRoleService } from './interfaces/role-service.interface';
import { Repository, IsNull, Like } from 'typeorm';
import { Role } from './entities/role.entity';
import { skip, take, remove } from './../../common/utils/utils';
import { MessageCodeError } from './../../common/errors/error-message-code';
import { ErrorCode } from './../../common/config/message-code';

@Injectable()
export class RoleService implements IRoleService {

  constructor(@Inject('RoleRepository') private readonly roleRepository: Repository<Role>) { }

  /*
    Public Functions
  */

  public async findAll(page: number): Promise<Role[]> {
    return await take(this.roleRepository, page, []);
  }

  public async findById(id: number): Promise<Role> {
    this.checkID(id);
    return await this.roleRepository.findOne({ id, deleted_at: IsNull() });
  }

  public async create(credentials: IRole): Promise<Role> {
    const role = new Role();

    role.name = credentials.name;
    role.description = credentials.description || null;

    return await this.roleRepository.save(role);
  }

  public async update(id: number, credentials: IRole): Promise<Role> {
    this.checkID(id);
    let role = await this.roleRepository.findOne({ id, deleted_at: IsNull() });

    this.checkRole(role);
    role = Object.assign(role, credentials);

    return await this.roleRepository.save(role);
  }

  public async delete(id: number): Promise<void> {
    await remove(this.roleRepository, id);
  }

  public async search(name: string, page: number): Promise<Role[]> {
    return await this.roleRepository.find({
      where: {
        name: Like(`${name}%`),
        deleted_at: null,
      },
      skip: skip(page),
      take: 1,
    });
  }

  public async getRecordsCount(isSearch?: boolean, name?: string): Promise<number> {
    let users;
    if (isSearch) {
      users = await this.roleRepository.find({
        where: {
          firstname: Like(`${name}%`),
          deleted_at: null,
        },
      });
    } else {
      users = await this.roleRepository.find({ deleted_at: IsNull() });
    }

    return users.length;
  }

  /*
    Private Functions
  */

  private checkID(id: number): void {
    if (!id) {
      throw new MessageCodeError(ErrorCode.USER_RUD_MISSING_ID);
    }
  }

  private checkRole(organization: Role): void {
    if (!organization) {
      throw new MessageCodeError(ErrorCode.USER_NOT_FOUND);
    }
  }
}

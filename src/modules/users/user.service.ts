import { skip, take, remove, takeByOrg } from './../../common/utils/utils';
import { MessageCodeError } from './../../common/errors/error-message-code';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, IsNull, Like, Brackets } from 'typeorm';
import { IUserService } from './interfaces/user-service.interface';
import { IUser } from './interfaces/user.interface';
import { ErrorCode } from './../../common/config/message-code';
import { Role } from './../roles/entities/role.entity';
import { Organization } from './../organizations/entities/organization.entity';

@Injectable()
export class UserService implements IUserService {

  constructor(@Inject('UserRepository') private readonly userRepository: Repository<User>) { }

  public async findAll(page: number, organization: Organization): Promise<User[]> {
    if (!organization) {
      return await take(this.userRepository, page, ['role', 'organization']);
    } else {
      return await takeByOrg(this.userRepository, page, organization, ['role', 'organization']);
    }
  }

  public async findById(id: number, organization: Organization): Promise<User> {
    this.checkID(id);
    if (!organization) {
      return await this.userRepository.findOne({
        relations: ['role', 'organization'],
        where: {
          id,
          deleted_at: IsNull(),
        },
      });
    } else {
      return await this.userRepository.findOne({
        relations: ['role', 'organization'],
        where: {
          id,
          deleted_at: IsNull(),
          organization: organization.id,
        },
      });
    }

  }

  public async create(credentials: IUser): Promise<User> {

    const email = credentials.email;

    const existingUser = await this.userRepository.findOne({ email, deleted_at: IsNull() });

    if (existingUser) {
      throw new MessageCodeError(ErrorCode.USER_CREATE_EMAIL_EXIST);
    }

    const user = new User();

    user.firstname = credentials.firstname;
    user.lastname = credentials.lastname;
    user.email = credentials.email;
    user.password = credentials.password;
    user.phone = credentials.phone || null;
    user.role = await Role.findOne({ where: { id: credentials.role, deleted_at: IsNull() } });
    user.organization = credentials.organization ? await Organization.findOne({
      where: { id: credentials.organization, deleted_at: IsNull() },
    }) : null;

    return await this.userRepository.save(user);
  }

  public async update(id: number, credentials: IUser): Promise<User> {
    this.checkID(id);
    let user = await this.userRepository.findOne({ id, deleted_at: IsNull() });

    if (credentials.role) {
      user.role = await Role.findOne({ where: { id: credentials.role, deleted_at: IsNull() } });
      delete credentials.role;
    }

    this.checkUser(user);
    user = Object.assign(user, credentials);

    return await this.userRepository.save(user);
  }

  public async delete(id: number): Promise<void> {
    await remove(this.userRepository, id);
  }

  public async search(name: string, page: number): Promise<User[]> {
    return await this.userRepository.createQueryBuilder('user')
      .where(new Brackets(sub => {
        sub.where('user.firstname like :firstname', { firstname: `${name}%` })
          .orWhere('user.lastname like :lastname', { lastname: `${name}%` });
      }))
      .andWhere('user.deleted_at is :deleted_at', { deleted_at: null })
      .skip(skip(page))
      .limit(10)
      .orderBy('created_at', 'DESC')
      .getMany();
  }

  public async getRecordsCount(isSearch?: boolean, name?: string): Promise<number> {
    let users;
    if (isSearch) {
      users = await this.userRepository.createQueryBuilder('user')
        .where(new Brackets(sub => {
          sub.where('user.firstname like :firstname', { firstname: `${name}%` })
            .orWhere('user.lastname like :lastname', { lastname: `${name}%` });
        }))
        .andWhere('user.deleted_at is :deleted_at', { deleted_at: null })
        .getMany();
    } else {
      users = await this.userRepository.find({ deleted_at: IsNull() });
    }

    return users.length;
  }

  public async getRoles(): Promise<Role[]> {
    return await Role.find({ where: { deleted_at: IsNull() } });
  }

  public async getOrganizations(): Promise<Organization[]> {
    return await Organization.find({ where: { deleted_at: IsNull() } });
  }

  /*
    Private Functions
  */

  private checkID(id: number): void {
    if (!id) {
      throw new MessageCodeError(ErrorCode.USER_RUD_MISSING_ID);
    }
  }

  private checkUser(user: User): void {
    if (!user) {
      throw new MessageCodeError(ErrorCode.USER_NOT_FOUND);
    }
  }

}

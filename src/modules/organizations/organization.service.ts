import { Injectable, Inject } from '@nestjs/common';
import { Repository, IsNull, Like } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { IOrganizationService } from './interfaes/organization-service.interface';
import { IOrganization } from './interfaes/organization.interface';
import { MessageCodeError } from './../../common/errors/error-message-code';
import { ErrorCode } from './../../common/config/message-code';
import { User } from './../users/entities/user.entity';
import { skip, take, remove } from './../../common/utils/utils';

@Injectable()
export class OrganizationService implements IOrganizationService {

  constructor(@Inject('OrganizationRepository') private readonly organizationRepository: Repository<Organization>) { }

  /*
    Public Functions
  */

  public async findAll(page: number): Promise<Organization[]> {
    return await take(this.organizationRepository, page, []);
  }

  public async findById(id: number): Promise<Organization> {
    this.checkID(id);
    return await this.organizationRepository.findOne({ id, deleted_at: IsNull() });
  }

  public async create(credentials: IOrganization): Promise<Organization> {
    const organization = new Organization();

    organization.name = credentials.name;
    organization.director = credentials.director;
    organization.identity_number = credentials.identity_number;
    organization.phone = credentials.phone;

    return await this.organizationRepository.save(organization);
  }

  public async update(id: number, credentials: IOrganization): Promise<Organization> {
    this.checkID(id);
    let organization = await this.organizationRepository.findOne({ id, deleted_at: IsNull() });

    this.checkOrganization(organization);
    organization = Object.assign(organization, credentials);

    return await this.organizationRepository.save(organization);
  }

  public async delete(id: number): Promise<void> {
    await remove(this.organizationRepository, id);
  }

  public async search(name: string, page: number): Promise<Organization[]> {
    return await this.organizationRepository.find({
      where: {
        name: Like(`%${name}%`),
        deleted_at: null,
      },
      skip: skip(page),
      take: 10,
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async getRecordsCount(isSearch?: boolean, name?: string): Promise<number> {
    let organizations;
    if (isSearch) {
      organizations = await this.organizationRepository.find({
        where: {
          firstname: Like(`%${name}%`),
          deleted_at: null,
        },
      });
    } else {
      organizations = await this.organizationRepository.find({ deleted_at: IsNull() });
    }

    return organizations.length;
  }

  /*
    Private Functions
  */

  private checkID(id: number): void {
    if (!id) {
      throw new MessageCodeError(ErrorCode.USER_RUD_MISSING_ID);
    }
  }

  private checkOrganization(organization: Organization): void {
    if (!organization) {
      throw new MessageCodeError(ErrorCode.USER_NOT_FOUND);
    }
  }

}

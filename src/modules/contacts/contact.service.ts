import { IContact } from 'modules/contacts/interfaces/contact.interface';
import { IContactService } from './interfaces/contact-service.interface';
import { Injectable, Inject } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { Organization } from './../organizations/entities/organization.entity';
import { Repository, IsNull } from 'typeorm';
import { MessageCodeError } from 'common/errors/error-message-code';
import { ErrorCode } from 'common/config/message-code';

@Injectable()
export class ContactService implements IContactService {

  constructor(@Inject('ContactRepository') private readonly contactRepository: Repository<Contact>) { }

  /*
    Public Functions
  */

  findAll(organization: Organization, page: any): Promise<Contact[]> {
    throw new Error('Method not implemented.');
  }

  findById(organization: Organization, id: number): Promise<Contact> {
    throw new Error('Method not implemented.');
  }

  public async create(credentials: IContact): Promise<Contact> {

    const existingContact = await this.contactRepository.findOne({ where: { email: credentials.email, deleted_at: IsNull() }});

    if (existingContact) {
      throw new MessageCodeError(ErrorCode.USER_CREATE_EMAIL_EXIST);
    }

    let contact = new Contact();

    contact = Object.assign(credentials);

    return await this.contactRepository.save(contact);
  }

  update(id: number, credentials: any): Promise<Contact> {
    throw new Error('Method not implemented.');
  }

  delete(id: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
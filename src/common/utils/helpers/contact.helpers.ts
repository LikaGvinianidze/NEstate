import { CreateContactDto } from './../../../modules/contacts/dto/create-contact.dto';
import { Contact } from './../../../modules/contacts/entities/contact.entity';
import { User } from './../../../modules/users/entities/user.entity';
import { IContact } from 'modules/contacts/interfaces/contact.interface';

export class ContactHelper {

  public async parseToContact(body, user: User): Promise<IContact> {
    const credentials = {
      ...body,
      user: body.user ? await User.findOne({ where: { deleted_at: null } }) : null,
      organization: user.organization,
    } as IContact;

    return credentials;
  }
}
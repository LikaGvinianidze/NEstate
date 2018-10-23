import { CreateContactDto } from './dto/create-contact.dto';
import { ContactHelper } from './../../common/utils/helpers/contact.helpers';
import { ContactService } from './contact.service';
import {
  Controller,
  Get,
  UseGuards,
  Query,
  Post,
  Res,
  Body,
  Put,
  Delete,
  Param,
  HttpStatus,
  Render,
} from '@nestjs/common';
import { SessionGuard } from './../../common/guards/session.guard';
import { RolesGuard } from './../../common/guards/roles.guard';
import { Roles } from './../../common/decorators/roles.decorator';
import { parseToState, getPagesCount } from './../../common/utils/utils';
import { ValidationPipe } from './../../common/pipes/validation.pipe';
import { SessionUser } from './../../common/utils/decorators/user.decorator';
import { ParseIntPipe } from './../../common/pipes/parse-int.pipe';
import { IContact } from './interfaces/contact.interface';

@Controller('contacts')
@UseGuards(SessionGuard, RolesGuard)
export class ContactController {

  contactHelper = null;
  constructor(private readonly contactService: ContactService) {
    this.contactHelper = new ContactHelper();
  }

  @Get()
  @Roles(...['admin', 'manager', 'employee'])
  @Render('contacts/index')
  public async index(@SessionUser() user, @Query('page', ParseIntPipe) page) {
    // const states = await this.clientService.findAll(page, user.organization);
    // const records = await this.clientService.getRecordsCount();

    return {
      user,
      // states,
      // pages: getPagesCount(records),
      // currentPage: page,
      // name: ''
    };

  }

  @Get('create')
  @Roles(...['admin', 'manager', 'employee'])
  @Render('contacts/create')
  public create(@SessionUser() user) {
    return {
      user,
    };
  }

  @Post('create')
  @Roles(...['admin', 'manager', 'employee'])
  public async store(@SessionUser() user, @Body(ValidationPipe) body: CreateContactDto, @Res() response) {
    const credentials: IContact = await this.contactHelper.parseToContact(body, user);
    const newContact = await this.contactService.create(credentials);

    return response.status(HttpStatus.CREATED).json(newContact);
  }

  @Put(':id')
  @Roles(...['admin', 'manager', 'employee'])
  public async update(@SessionUser() user, @Param('id', ParseIntPipe) id, @Res() response) {
    return {
      user,
    };
  }

  @Delete(':id')
  @Roles(...['admin', 'manager', 'employee'])
  public async remove(@Param('id', ParseIntPipe) id, @Res() response) {
    // await this.clientService.delete(id);
    return response.status(HttpStatus.OK).end();
  }
}

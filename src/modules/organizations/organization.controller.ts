import { getPagesCount } from './../../common/utils/utils';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import {
  Controller,
  Res,
  Query,
  UseGuards,
  Get,
  Req,
  Post,
  Body,
  HttpStatus,
  Param,
  Put,
  Delete,
  Render,
} from '@nestjs/common';
import { ParseIntPipe } from './../../common/pipes/parse-int.pipe';
import { OrganizationService } from './organization.service';
import { SessionGuard } from './../../common/guards/session.guard';
import { ValidationPipe } from './../../common/pipes/validation.pipe';
import { RolesGuard } from './../../common/guards/roles.guard';
import { Roles } from './../../common/decorators/roles.decorator';
import { SessionUser } from './../../common/utils/decorators/user.decorator';

@Controller('organizations')
@UseGuards(SessionGuard, RolesGuard)
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) { }

  @Get()
  @Roles('admin')
  @Render('organizations/index')
  async index(@SessionUser() user, @Query('page', ParseIntPipe) page) {
    const organizations = await this.orgService.findAll(page);
    const records = await this.orgService.getRecordsCount();

    return {
      user,
      organizations,
      pages: getPagesCount(records),
      currentPage: page,
      name: '',
    };
  }

  @Get('search')
  @Roles('admin')
  @Render('organizations/search')
  public async search(@Query('name') name, @Query('page', ParseIntPipe) page) {
    const organizations = await this.orgService.search(name, page);
    const records = await this.orgService.getRecordsCount(true, name);

    return {
      organizations,
      pages: getPagesCount(records),
      currentPage: page,
      name,
    };
  }

  @Get('create')
  @Roles('admin')
  @Render('organizations/create')
  public create(@SessionUser() user) {
    return {
      user,
    };
  }

  @Post('create')
  @Roles('admin')
  public async store(@Res() response, @Body(ValidationPipe) body: CreateOrganizationDto) {
    const newOrg = await this.orgService.create(body);
    return response.status(HttpStatus.CREATED).json(newOrg);
  }

  @Get('select-organization')
  @Roles('admin')
  @Render('organizations/select-org')
  public selectOrganization(@Res() response, @SessionUser() user) {
    if (user.organization) {
      return response.redirect('/organizations');
    }
    return {
      user,
      select: true,
    };
  }

  @Get(':id')
  @Roles('admin')
  @Render('organizations/edit')
  public async show(@SessionUser() user, @Param('id', ParseIntPipe) id) {
    const organization = await this.orgService.findById(id);
    return {
      user,
      organization,
    };
  }

  @Put(':id')
  @Roles('admin')
  public async update(@Body(ValidationPipe) credentials: CreateOrganizationDto, @Param('id', ParseIntPipe) id, @Res() response) {
    const updatedUser = await this.orgService.update(id, credentials);
    return response.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete(':id')
  @Roles('admin')
  public async remove(@Param('id', ParseIntPipe) id, @Res() response) {
    await this.orgService.delete(id);
    return response.status(HttpStatus.OK).end();
  }

  @Get('set-organization/:id')
  @Roles('admin')
  public async setGlobalOrganization(@Param('id', ParseIntPipe) id, @Res() response, @SessionUser() user) {
    user.organization = await this.orgService.findById(id);
    return response.status(200).end();
  }
}

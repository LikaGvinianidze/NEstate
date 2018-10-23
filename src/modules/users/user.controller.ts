import { getPagesCount } from './../../common/utils/utils';
import { ValidationPipe } from './../../common/pipes/validation.pipe';
import { ParseIntPipe } from './../../common/pipes/parse-int.pipe';
import { SessionGuard } from './../../common/guards/session.guard';
import { UserService } from './user.service';
import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Render,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from './../../common/decorators/roles.decorator';
import { RolesGuard } from './../../common/guards/roles.guard';
import { SessionUser } from './../../common/utils/decorators/user.decorator';

@Controller('users')
@UseGuards(SessionGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Roles(...['admin', 'manager'])
  @Render('users/index')
  public async index(@SessionUser() user, @Query('page', ParseIntPipe) page) {
    const users = await this.userService.findAll(page, user.organization);
    const records = await this.userService.getRecordsCount();

    return {
      user,
      users,
      email: user.email,
      pages: getPagesCount(records),
      currentPage: page,
      name: '',
    };
  }

  @Get('search')
  @Roles(...['admin', 'manager'])
  @Render('users/search')
  public async search(@SessionUser() user, @Query('name') name, @Query('page', ParseIntPipe) page) {
    const users = await this.userService.search(name, page);
    const records = await this.userService.getRecordsCount(true, name);
    return {
      users,
      email: user.email,
      pages: getPagesCount(records),
      currentPage: page,
      name,
    };
  }

  @Get('create')
  @Roles(...['admin', 'manager'])
  @Render('users/create')
  public async create(@SessionUser() user) {
    const roles = await this.userService.getRoles();
    const organizations = await this.userService.getOrganizations();
    return {
      user,
      roles,
      organizations,
    };
  }

  @Post('create')
  @Roles(...['admin', 'manager'])
  public async store(@Res() response, @Body(ValidationPipe) body: CreateUserDto) {
    const newUser = await this.userService.create(body);
    return response.status(HttpStatus.CREATED).json(newUser);
  }

  @Get(':id')
  @Roles(...['admin', 'manager'])
  @Render('users/edit')
  public async show(@SessionUser() user, @Param('id', ParseIntPipe) id) {
    const editUser = await this.userService.findById(id, user.organization);
    const roles = await this.userService.getRoles();
    const organizations = await this.userService.getOrganizations();
    return {
      user,
      editUser,
      roles,
      organizations,
    };
  }

  @Put(':id')
  @Roles(...['admin', 'manager'])
  public async update(@Body(ValidationPipe) credentials: CreateUserDto, @Param('id', ParseIntPipe) id, @Res() response) {
    const updatedUser = await this.userService.update(id, credentials);
    return response.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete(':id')
  @Roles(...['admin', 'manager'])
  public async remove(@Param('id', ParseIntPipe) id, @Res() response) {
    await this.userService.delete(id);
    return response.status(HttpStatus.OK).end();
  }
}

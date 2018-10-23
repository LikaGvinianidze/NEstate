import { CreateRoleDto } from './dto/create-role.dto';
import {
  Controller,
  UseGuards,
  Get,
  Res,
  Query,
  HttpStatus,
  Req,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SessionGuard } from './../../common/guards/session.guard';
import { RolesGuard } from './../../common/guards/roles.guard';
import { RoleService } from './role.service';
import { Roles } from './../../common/decorators/roles.decorator';
import { ParseIntPipe } from './../../common/pipes/parse-int.pipe';
import { ValidationPipe } from './../../common/pipes/validation.pipe';
import { moreThen } from './../../common/utils/utils';

@Controller('roles')
@UseGuards(SessionGuard, RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  @Roles('admin')
  // @Render('roles/index')
  async index(@Res() response, @Query('page', ParseIntPipe) page) {
    const roles = await this.roleService.findAll(page);
    return response.status(HttpStatus.OK).json(roles);
  }

  @Get('search')
  @Roles('admin')
  // @Render('roles/search')
  public async search(@Query('name') name, @Query('page', ParseIntPipe) page) {
    const roles = await this.roleService.search(name, page);
    const records = await this.roleService.getRecordsCount(true, name);
    let pages = 1;

    if (moreThen(records, 1)) {
      pages = Math.ceil(records / 1);
    }

    return {
      roles,
      pages,
      currentPage: page,
      name,
    };
  }

  @Get('create')
  @Roles('admin')
  // @Render('roles/create')
  public create(@Req() request, @Res() response) {
    return;
  }

  @Post('create')
  @Roles('admin')
  public async store(@Res() response, @Body(ValidationPipe) body: CreateRoleDto) {
    const newRole = await this.roleService.create(body);
    return response.status(HttpStatus.CREATED).json(newRole);
  }

  @Get(':id')
  @Roles('admin')
  // @Render('roles/edit')
  public async show(@Param('id') id, @Res() response) {
    const user = await this.roleService.findById(id);
    return { user };
  }

  @Put(':id')
  @Roles('admin')
  public async update(@Body() credentials: CreateRoleDto, @Param('id') id, @Res() response) {
    const updatedRole = await this.roleService.update(id, credentials);
    return response.status(HttpStatus.OK).json(updatedRole);
  }

  @Delete(':id')
  @Roles('admin')
  public async remove(@Param('id') id, @Res() response) {
    await this.roleService.delete(id);
    return response.status(HttpStatus.OK).end();
  }
}

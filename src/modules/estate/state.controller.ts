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
  UseInterceptors,
  FilesInterceptor,
  UploadedFiles,
} from '@nestjs/common';
import { StateService } from './state.service';
import { SessionGuard } from './../../common/guards/session.guard';
import { RolesGuard } from './../../common/guards/roles.guard';
import { Roles } from './../../common/decorators/roles.decorator';
import { CreateStateDto } from './dto/create-state.dto';
import { parseToState, getPagesCount, storage, merge } from './../../common/utils/utils';
import { ValidationPipe } from './../../common/pipes/validation.pipe';
import { SessionUser } from './../../common/utils/decorators/user.decorator';
import { IState } from './interfaces/state.interface';
import { ParseIntPipe } from './../../common/pipes/parse-int.pipe';
import { IObject } from './../../common/utils/interfaces/object.interface';
import {
  hotWater,
  parking,
  exchange,
  status,
  heating,
  store,
  flatType,
  restroom,
  features,
} from '../../common/enums';

@Controller('states')
@UseGuards(SessionGuard, RolesGuard)
export class StateController {

  constructor(private readonly stateService: StateService) { }

  @Get()
  @Roles(...['admin', 'manager', 'employee'])
  @Render('states/index')
  public async index(@SessionUser() user, @Query('page', ParseIntPipe) page) {
    const states = await this.stateService.findAll(page, user.organization);
    const records = await this.stateService.getRecordsCount();
    const data: IObject = await this.stateService.getMainEntities();

    return {
      user,
      states,
      pages: getPagesCount(records),
      currentPage: page,
      name: '',
      currencies: data.currencies,
      projects: data.projects,
      conditions: data.conditions,
      exchange,
      flatType,
    };
  }

  @Get('card/:id')
  @Roles(...['admin', 'manager', 'employee'])
  @Render('states/card')
  public async getCard(@SessionUser() user, @Param('id', ParseIntPipe) id) {
    const data: IObject = await this.stateService.getMainEntities();
    const state = await this.stateService.findById(id, user);
    const statuses = merge(status);
    const restrooms = restroom;

    return {
      user,
      state,
      statuses,
      restrooms,
      store,
      parking,
      currencies: data.currencies,
      projects: data.projects,
      conditions: data.conditions,
      exchange,
      features,
    };
  }

  @Get('create')
  @Roles(...['admin', 'manager', 'employee'])
  @Render('states/create')
  public create(@SessionUser() user) {
    return {
      user,
    };
  }

  @Get('create/get-fields')
  @Roles(...['admin', 'manager', 'employee'])
  public async getMainFields(@Res() response) {
    const mainFields: IObject = await this.stateService.getMainEntities();
    mainFields.enums = {
      heating,
      hotWater,
      store,
      parking,
      status,
      exchange,
      flatType,
    };

    return response.status(HttpStatus.OK).json(mainFields);
  }

  @Get('create/get-villages')
  @Roles(...['admin', 'manager', 'employee'])
  public async getVillages(@Res() response, @Query('municipality', ParseIntPipe) id) {
    const villages = await this.stateService.getVillages(id);

    return response.status(HttpStatus.OK).json(villages);
  }

  @Get('create/render-features')
  @Roles(...['admin', 'manager', 'employee'])
  public async renderFeatures(@Res() response, @Query('view') view, @Query('search') loc) {
    if (view === 'land') {
      if (loc) {
        return response.render('states/search-features', {
          land: true,
        });
      } else {
        return response.render('states/land-features');
      }
    } else {
      if (loc) {
        return response.render('states/search-features', {
          land: false,
        });
      } else {
        const {conditions}: IObject = await this.stateService.getMainEntities();
        return response.render('states/common-features', {
          conditions,
        });
      }
    }
  }

  @Get('search')
  @Roles(...['admin', 'manager', 'employee'])
  @Render('states/search')
  public async search(@SessionUser() user, @Query('data') data, @Query('land') land, @Query('page', ParseIntPipe) page) {
    const states = await this.stateService.search(data, page, user);
    const records = await this.stateService.getRecordsCount();
    // console.log(states);
    return {
      states,
      pages: getPagesCount(records),
      currentPage: page,
      name: '',
      land,
    };
  }

  @Post('create')
  @Roles(...['admin', 'manager', 'employee'])
  public async store(@SessionUser() user, @Res() response, @Body(ValidationPipe) body: CreateStateDto) {
    const credentials = parseToState(body, user) as IState;
    const newState = await this.stateService.create(credentials);

    return response.status(HttpStatus.CREATED).json(newState);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('photo', 12, {
    storage,
    limits: {
      fileSize: 5500000,
    },
  }))
  uploadFile(@UploadedFiles() files) {
    // console.log(files);
  }

  @Get(':id')
  @Roles(...['admin', 'manager', 'employee'])
  @Render('states/edit')
  public async show(@SessionUser() user, @Param('id', ParseIntPipe) id) {
    const state = await this.stateService.findById(id, user);
    const data: IObject = await this.stateService.getMainEntities();

    return {
      user,
      state,
      ...data,
      status,
      flatType,
      exchange,
      features: {
        hotWater,
        store,
        parking,
        heating,
      },
    };
  }

  @Put(':id')
  @Roles(...['admin', 'manager', 'employee'])
  public async update(
    @SessionUser() user,
    @Body(ValidationPipe) body: CreateStateDto,
    @Param('id', ParseIntPipe) id,
    @Res() response) {
    const credentials = parseToState(body, user) as IState;
    const updatedState = await this.stateService.update(id, credentials);

    return response.status(HttpStatus.OK).json(updatedState);
  }

  @Delete(':id')
  @Roles(...['admin', 'manager', 'employee'])
  public async remove(@Param('id', ParseIntPipe) id, @Res() response) {
    await this.stateService.delete(id);
    return response.status(HttpStatus.OK).end();
  }
}

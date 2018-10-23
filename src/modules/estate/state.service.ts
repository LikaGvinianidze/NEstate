import { IStateService } from './interfaces/state-service.intreface';
import { skip } from './../../common/utils/utils';
import { take, remove } from './../../common/utils/utils';
import { Injectable, Inject } from '@nestjs/common';
import { Repository, IsNull, Brackets } from 'typeorm';
import { MessageCodeError } from './../../common/errors/error-message-code';
import { ErrorCode } from './../../common/config/message-code';
import { IState } from './interfaces/state.interface';
import { Contact } from './../contacts/entities/contact.entity';
import {
  State,
  TransactionType,
  AreaType,
  StateType,
  Currency,
  Municipality,
  Village,
  Condition,
  Project,
} from './entities';
import { User } from './../users/entities/user.entity';
import { StateHelper } from './../../common/utils/helpers/state.helpers';

@Injectable()
export class StateService implements IStateService {

  constructor(@Inject('StateRepository') private readonly stateRepository: Repository<State>) { }

  public async findAll(page: number, user: User): Promise<State[]> {
    const relations = [
      'user',
      'organization',
      'state_type',
      'transaction_type',
      'municipality',
      'village',
      'area_type',
      'currency',
    ];
    const states = await take(this.stateRepository, page, relations);

    return states;
  }

  public async findById(id: number, user: User): Promise<State> {
    this.checkID(id);

    return await this.stateRepository.findOne({
      relations: [
        'user',
        'organization',
        'state_type',
        'transaction_type',
        'municipality',
        'village',
        'area_type',
        'currency',
        'condition',
        'project',
      ],
      where: {
        id,
        deleted_at: IsNull(),
        organization: user.organization,
      },
    });
  }

  public async create(credentials: IState) {
    const state = new State();

    // TODO: throw exception when important field is empty
    state.street = credentials.street;
    state.area = credentials.area;
    state.total_price = credentials.price;
    state.price_type = Number(credentials.price_type) === 1 ? credentials.price_type : 0; // 1 is price per metre and 0 is total price type
    state.comment = credentials.comment ? credentials.comment : null;
    state.features = credentials.features; // TODO: check for stateless
    state.rooms_quantity = credentials.rooms_quantity ? credentials.rooms_quantity : null;
    state.bedrooms_quantity = credentials.bedrooms_quantity ? credentials.bedrooms_quantity : null;
    state.restrooms_quantity = credentials.restrooms_quantity ? credentials.restrooms_quantity : null;
    state.floor = credentials.floor ? credentials.floor : null;
    state.floors_quantity = credentials.floors_quantity ? credentials.floors_quantity : null;
    state.ceiling_height = credentials.ceiling_height ? credentials.ceiling_height : null;
    state.balcony = credentials.balcony ? credentials.balcony : null;
    state.cadastral_code = credentials.cadastral_code ? credentials.cadastral_code : null;
    state.balcony_area = credentials.balcony_area ? credentials.balcony_area : null;
    state.veranda_area = credentials.veranda_area ? credentials.veranda_area : null;
    state.loggie_area = credentials.loggie_area ? credentials.loggie_area : null;
    state.flat_type = credentials.flat_type ? credentials.flat_type : null;
    state.status = credentials.status ? credentials.status : null;
    state.exchange = credentials.exchange ? credentials.exchange : null;
    state.owner = credentials.owner ? await Contact.findOne({ where: { id: credentials.owner, deleted_at: IsNull() } }) : null;
    state.project = credentials.project ? await Project.findOne({ where: { id: credentials.project, deleted_at: IsNull() } }) : null;
    state.condition = credentials.condition ? await Condition.findOne({ where: { id: credentials.condition, deleted_at: IsNull() } }) : null;
    state.currency = await Currency.findOne({ where: { id: credentials.currency, deleted_at: IsNull() } });
    state.area_type = await AreaType.findOne({ where: { id: credentials.area_type, deleted_at: IsNull() } });
    state.municipality = await Municipality.findOne({ where: { id: credentials.municipality, deleted_at: IsNull() } });
    state.village = await Village.findOne({ where: { id: credentials.village, deleted_at: IsNull() } });
    state.state_type = await StateType.findOne({ where: { id: credentials.state_type, deleted_at: IsNull() } });
    state.transaction_type = await TransactionType.findOne({ where: { id: credentials.transaction_type, deleted_at: IsNull() } });
    state.organization = credentials.organization;
    state.user = credentials.user;

    return await this.stateRepository.save(state);
  }

  public async update(id: number, credentials: IState): Promise<State> {
    this.checkID(id);
    let state = await this.stateRepository.findOne({ id, deleted_at: IsNull() });

    this.checkState(state);
    state = Object.assign(state, credentials);

    return await this.stateRepository.save(state);
  }

  public async delete(id: number): Promise<void> {
    await remove(this.stateRepository, id);
  }

  public async getRecordsCount(isSearch?: boolean, name?: string): Promise<number> {
    let states;
    if (isSearch) {
      states = await this.stateRepository.createQueryBuilder('state')
        .where(new Brackets(sub => {
          sub.where('user.firstname like :firstname', { firstname: `${name}%` })
            .orWhere('user.lastname like :lastname', { lastname: `${name}%` });
        }))
        .andWhere('user.deleted_at is :deleted_at', { deleted_at: null })
        .getMany();
    } else {
      states = await this.stateRepository.find({ deleted_at: IsNull() });
    }

    return states.length;
  }

  public async getMainEntities(): Promise<object> {
    const transactionTypes = await TransactionType.find({ where: { deleted_at: null } });
    const stateTypes = await StateType.find({ where: { deleted_at: null } });
    const areaTypes = await AreaType.find({ where: { deleted_at: null } });
    const currencies = await Currency.find({ where: { deleted_at: null } });
    const municipalities = await Municipality.find({ where: { deleted_at: null } });
    const villages = await Village.find({ where: { deleted_at: null } });
    const conditions = await Condition.find({ where: { deleted_at: null } });
    const projects = await Project.find({ where: { deleted_at: null } });
    const clients = await Contact.find({ where: { deleted_at: null } });

    return {
      transactionTypes,
      stateTypes,
      areaTypes,
      currencies,
      municipalities,
      villages,
      conditions,
      projects,
      clients,
    };
  }

  public async getVillages(id: number): Promise<Village[]> {
    return await Village.find({
      where: {
        deleted_at: IsNull(),
        municipality: await Municipality.findOne({ where: { id, deleted_at: IsNull() } }),
      },
    });
  }

  public async search(data: object, page: number, user?: User): Promise<State[]> {
    const stateHelper = new StateHelper();
    const conditions = stateHelper.getSearchFields(data);

    try {
      return await State.find({
        relations: [
          'municipality',
          'village',
          'area_type',
          'currency',
        ],
        where: {
          deleted_at: IsNull(),
          organization: user.organization,
          ...conditions,
        },
        skip: skip(page),
        take: 10, // Rows per page
        order: {
          created_at: 'DESC',
        },
      });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
    }
  }

  /*
    Private Functions
  */

  private checkID(id: number): void {
    if (!id) {
      throw new MessageCodeError(ErrorCode.USER_RUD_MISSING_ID);
    }
  }

  private checkState(state: State): void {
    if (!state) {
      throw new MessageCodeError(ErrorCode.USER_NOT_FOUND);
    }
  }
}

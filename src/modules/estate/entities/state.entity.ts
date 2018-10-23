import {
  PrimaryGeneratedColumn,
  Entity,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import { Organization } from './../../organizations/entities/organization.entity';
import { User } from './../../users/entities/user.entity';
import { Municipality } from './municipality.entity';
import { Village } from './village.entity';
import { StateType } from './state-type.entity';
import { TransactionType } from './transaction-type.entity';
import { Condition, Currency, AreaType, Project } from './units.entity';
import { Contact } from './../../contacts/entities/contact.entity';
import { randomValueHex } from './../../../common/utils/utils';
import * as stateEnums from './../../../common/enums/index';

@Entity('states')
export class State extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
    collation: 'utf8_general_ci',
  })
  street: string;

  @Column({
    type: 'double',
    nullable: false,
  })
  area: number;

  @Column({
    type: 'double',
    nullable: false,
  })
  total_price: number;

  @Column({
    type: 'double',
    nullable: false,
  })
  square_price: number;

  @Column({
    type: 'tinyint',
    nullable: false,
  })
  price_type: number;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
    nullable: true,
  })
  comment: string;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
    length: '1000',
    nullable: true,
  })
  features?: string;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  rooms_quantity?: number;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  bedrooms_quantity?: number;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  floor?: number;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  floors_quantity?: number;

  @Column({
    type: 'enum',
    nullable: true,
    enum: [
      ...Object.keys(stateEnums.restroom),
    ],
  })
  restrooms_quantity?: string;

  @Column({
    type: 'double',
    nullable: true,
  })
  ceiling_height?: number;

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  balcony?: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  cadastral_code?: string;

  @Column({
    type: 'double',
    nullable: true,
  })
  balcony_area?: number;

  @Column({
    type: 'double',
    nullable: true,
  })
  veranda_area?: number;

  @Column({
    type: 'double',
    nullable: true,
  })
  loggie_area?: number;

  @Column({
    type: 'enum',
    nullable: true,
    collation: 'utf8_general_ci',
    enum: [
      ...Object.keys(stateEnums.flatType),
    ],
  })
  flat_type: string;

  @Column({
    type: 'enum',
    nullable: true,
    collation: 'utf8_general_ci',
    enum: [
      ...Object.keys(stateEnums.exchange),
    ],
  })
  exchange: string;

  @Column({
    type: 'enum',
    nullable: true,
    collation: 'utf8_general_ci',
    enum: [
      ...Object.keys(stateEnums.status.flat),
      ...Object.keys(stateEnums.status.comercial),
      ...Object.keys(stateEnums.status.land),
    ],
  })
  status: string;

  @Column({
    type: 'varchar',
  })
  slug: string;

  @ManyToOne(() => Contact, contact => contact.states)
  @JoinColumn({
    name: 'contactID',
  })
  owner: Contact;

  @ManyToOne(() => Project, project => project.states)
  @JoinColumn({
    name: 'projectID',
  })
  project: Project;

  @ManyToOne(() => Condition, condition => condition.states)
  @JoinColumn({
    name: 'conditionID',
  })
  condition: Condition;

  @ManyToOne(() => Currency, currency => currency.states)
  @JoinColumn({
    name: 'currencyID',
  })
  currency: Currency;

  @ManyToOne(() => AreaType, area => area.states)
  @JoinColumn({
    name: 'area_typeID',
  })
  area_type: AreaType;

  @ManyToOne(() => Organization, organization => organization.states)
  @JoinColumn({
    name: 'organizationID',
  })
  organization: Organization;

  @ManyToOne(() => User, user => user.states)
  @JoinColumn({
    name: 'userID',
  })
  user: User;

  @ManyToOne(() => Municipality, municipality => municipality.states)
  @JoinColumn({
    name: 'municipalityID',
  })
  municipality: Municipality;

  @ManyToOne(() => Village, village => village.states)
  @JoinColumn({
    name: 'villageID',
  })
  village: Village;

  @ManyToOne(() => StateType, state => state.states)
  @JoinColumn({
    name: 'state_typeID',
  })
  state_type: StateType;

  @ManyToOne(() => TransactionType, transaction => transaction.states)
  @JoinColumn({
    name: 'transaction_typeID',
  })
  transaction_type: TransactionType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: 'timestamp',
    default: null,
  })
  deleted_at: string;

  @BeforeInsert()
  setValues() {
    this.slug = randomValueHex(12);

    // If user adds a state with price per square metre
    if (Number(this.price_type) === 1) {
      this.total_price *= this.area;
    }

    this.square_price = Number((this.total_price / this.area).toFixed(2));
  }

}

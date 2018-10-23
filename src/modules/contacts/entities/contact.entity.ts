import { Organization } from './../../organizations/entities/organization.entity';
import { User } from './../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { State } from './../../estate/entities/state.entity';
import { contactStatus, contactType, sources } from './../../../common/enums';

@Entity('contacts')
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
    nullable: false,
  })
  firstname: string;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
    nullable: false,
  })
  lastname: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  birth_date: string;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
    nullable: true,
  })
  contact_person: string;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
    nullable: true,
  })
  org_name: string;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
    nullable: true,
  })
  comment: string;

  @Column({
    type: 'enum',
    collation: 'utf8_general_ci',
    enum: [
      ...Object.keys(contactStatus),
    ],
  })
  contact_status: string;

  @Column({
    type: 'enum',
    collation: 'utf8_general_ci',
    enum: [
      ...Object.keys(contactType),
    ],
  })
  contact_type: string;

  @Column({
    type: 'enum',
    collation: 'utf8_general_ci',
    enum: [
      ...Object.keys(sources),
    ],
  })
  source: string;

  @OneToMany(() => State, state => state.owner)
  states: State[];

  @ManyToOne(() => User, user => user.states)
  @JoinColumn({
    name: 'userID',
  })
  user: User;

  @ManyToOne(() => Organization, organization => organization.contacts)
  @JoinColumn({
    name: 'organizationID',
  })
  organization: Organization;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: 'timestamp',
    default: null,
  })
  deleted_at: string;
}

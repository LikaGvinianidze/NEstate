import { Contact } from './../../contacts/entities/contact.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './../../users/entities/user.entity';
import { State } from './../../estate/entities/state.entity';

@Entity('organizations')
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
  })
  name: string;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
  })
  director: string;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
  })
  identity_number: string;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
  })
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: 'timestamp',
    default: null,
  })
  deleted_at: string;

  @OneToMany(() => User, user => user.organization)
  users: User[];

  @OneToMany(() => State, state => state.organization)
  states: State[];

  @OneToMany(() => Contact, contact => contact.organization)
  contacts: Contact[];
}

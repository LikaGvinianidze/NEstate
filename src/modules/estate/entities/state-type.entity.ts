import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { State } from './state.entity';

@Entity('state_types')
export class StateType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    collation: 'utf8_general_ci',
  })
  name: string;

  @OneToMany(() => State, state => state.state_type)
  states: State[];

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

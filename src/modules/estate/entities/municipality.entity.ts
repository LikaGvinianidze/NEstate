import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Village } from './village.entity';
import { State } from './state.entity';

@Entity('municipalities')
export class Municipality extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    collation: 'utf8_general_ci',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    collation: 'utf8_general_ci',
  })
  is_city: boolean;

  @OneToMany(() => Village, village => village.municipality)
  villages: Village[];

  @OneToMany(() => State, state => state.municipality)
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

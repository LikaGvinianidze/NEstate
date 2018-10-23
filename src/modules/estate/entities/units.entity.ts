import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Entity } from 'typeorm';
import { State } from './state.entity';

@Entity('conditions')
export class Condition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
    nullable: false,
  })
  name: string;

  @OneToMany(() => State, state => state.condition)
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

@Entity('currencies')
export class Currency extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
    nullable: false,
  })
  name: string;

  @OneToMany(() => State, state => state.currency)
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

@Entity('area_types')
export class AreaType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
    nullable: false,
  })
  name: string;

  @OneToMany(() => State, state => state.area_type)
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

@Entity('projects')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    collation: 'utf8_general_ci',
    nullable: false,
  })
  name: string;

  @OneToMany(() => State, state => state.project)
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

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Municipality } from './municipality.entity';
import { State } from './state.entity';

@Entity('villages')
export class Village extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    collation: 'utf8_general_ci',
  })
  name: string;

  @ManyToOne(() => Municipality, municipality => municipality.villages)
  @JoinColumn({
    name: 'municipalityID',
  })
  municipality: Municipality;

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

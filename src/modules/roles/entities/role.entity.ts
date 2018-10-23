import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './../../users/entities/user.entity';

@Entity('roles')
export class Role extends BaseEntity {
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
    nullable: true,
  })
  description: string;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @CreateDateColumn()
  private created_at: Date;

  @UpdateDateColumn()
  private updated_at: Date;

  @Column({
    type: 'timestamp',
    default: null,
  })
  deleted_at: string;
}

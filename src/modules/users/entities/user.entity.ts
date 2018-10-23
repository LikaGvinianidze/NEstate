import { Contact } from './../../contacts/entities/contact.entity';
import * as bcrypt from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MessageCodeError } from './../../../common/errors/error-message-code';
import { ErrorCode } from './../../../common/config/message-code';
import { Organization } from './../../organizations/entities/organization.entity';
import { Role } from './../../roles/entities/role.entity';
import { State } from './../../estate/entities/state.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    collation: 'utf8_general_ci',
  })
  firstname: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    collation: 'utf8_general_ci',
  })
  lastname: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phone: string;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({
    name: 'roleID',
  })
  role: Role;

  @ManyToOne(() => Organization, organization => organization.users)
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

  @OneToMany(() => State, state => state.user)
  states: State[];

  @OneToMany(() => Contact, contact => contact.user)
  contacts: Contact[];

  @BeforeInsert()
  validate() {
    if (!this.firstname) throw new MessageCodeError(ErrorCode.USER_CREATE_MISSING_FIRSTNAME);
    if (!this.lastname) throw new MessageCodeError(ErrorCode.USER_CREATE_MISSING_LASTNAME);
    if (!this.email) throw new MessageCodeError(ErrorCode.USER_CREATE_MISSING_EMAIL);
    if (!this.password) throw new MessageCodeError(ErrorCode.USER_CREATE_MISSING_PASSWORD);
  }

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    // Hashing password
    const salt = await bcrypt.genSalt(10);
    if (this.password) {
      const passwordHash = await bcrypt.hash(this.password, salt);
      this.password = passwordHash;
    }
  }
}

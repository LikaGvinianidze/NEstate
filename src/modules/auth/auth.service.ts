import { IAuthService } from './interfaces/auth-ervice.interface';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './../users/entities/user.entity';
import { MessageCodeError } from './../../common/errors/error-message-code';
import { ErrorCode } from './../../common/config/message-code';

@Injectable()
export class AuthService implements IAuthService {

  public async validateUser(userCredintials: { email: string, password: string }): Promise<User> {
    const user = await this.authenticateUser(userCredintials);

    return user;
  }

  private async authenticateUser(userCredentials: { email: string, password: string }): Promise<User> {
    const [email, password] = [userCredentials.email, userCredentials.password];
    const user = await User.findOne(
      {
        relations: ['role', 'organization'],
        select: ['id', 'firstname', 'lastname', 'password', 'email', 'role', 'organization'],
        where: { email, deleted_at: null },
      },
    );

    if (!user) throw new MessageCodeError(ErrorCode.USER_NOT_FOUND);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new MessageCodeError(ErrorCode.PASSWORD_NOT_MATCH);

    delete user.password;

    return user;
  }
}

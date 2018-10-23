import { User } from './../../users/entities/user.entity';

export interface IAuthService  {
  validateUser(userCredintials: { email: string, password: string }): Promise<User>;
}

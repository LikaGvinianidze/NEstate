import { User } from './../../users/entities/user.entity';
import { IState } from './state.interface';
import { State } from './../entities/state.entity';

export interface IStateService {
  findAll(page: number, user: User): Promise<Array<State>>;
  findById(id: number, user: User): Promise<State>;
  create(creadintials: IState): Promise<State>;
  update(id: number, creadintials: IState): Promise<State>;
  delete(id: number): Promise<void>;
}

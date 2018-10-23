import { Organization } from './../../organizations/entities/organization.entity';
import { User } from './../../users/entities/user.entity';
import {
  Condition,
  Currency,
  AreaType,
  Municipality,
  Village,
  StateType,
  TransactionType,
} from '../entities';

export interface IState {
  street: string;
  area: number;
  price: number;
  price_type: number;
  comment?: string;
  features?: string;
  rooms_quantity?: number;
  restrooms_quantity?: string;
  bedrooms_quantity?: number;
  floor?: number;
  floors_quantity?: number;
  ceiling_height?: number;
  balcony?: number;
  cadastral_code?: string;
  balcony_area?: number;
  veranda_area?: number;
  loggie_area?: number;
  owner?: number;
  project?: number;
  condition?: number;
  currency: number;
  area_type: number;
  status?: string;
  flat_type?: string;
  exchange?: string;
  municipality: number;
  village?: number;
  state_type: number;
  transaction_type: number;
  organization: Organization;
  user: User;
}

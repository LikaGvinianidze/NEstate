import { Organization } from './../../modules/organizations/entities/organization.entity';
import { User } from './../../modules/users/entities/user.entity';
import { CreateStateDto } from './../../modules/estate/dto/create-state.dto';
import * as moment from 'moment';
import { Repository, IsNull } from 'typeorm';
import { MessageCodeError } from './../errors/error-message-code';
import { ErrorCode } from './../config/message-code';
import * as multer from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';
import { isObject } from 'util';

export const moreThen = (quantity: number, num: number) => {
  return quantity > num ? true : false;
};

export const skip = (page: number): number => {
  let skipNum = 0;
  if (page > 1) {
    skipNum = (page - 1) * 10;
  }
  return skipNum;
};

export const take = async (repozitory: Repository<any>, page: number, relations: Array<string>): Promise<any[]> => {
  return await repozitory.find({
    relations,
    where: {
      deleted_at: IsNull(),
    },
    skip: skip(page),
    take: 10, // Rows per page
    order: {
      created_at: 'DESC',
    },
  });
};

export const takeByOrg = async (
  repozitory: Repository<any>,
  page: number,
  organization: Organization,
  relations: Array<string>): Promise<any[]> => {
  return await repozitory.find({
    relations,
    where: {
      deleted_at: IsNull(),
      organization: organization.id,
    },
    skip: skip(page),
    take: 10, // Rows per page
    order: {
      created_at: 'DESC',
    },
  });
};

export const hasKeys = (keys: Array<any>, obj: object): boolean => {
  let has: boolean = true;
  keys.forEach(key => {
    if (!obj.hasOwnProperty(key)) {
      has = false;
    }
  });

  return has;
};

export const buildLikeStatement = (values: Array<any>): string => {
  const statement = values.map(val => `%${val}%`);
  return statement.join('');
};

export const remove = async (repozitory: Repository<any>, id: number): Promise<void> => {
  if (!id) {
    throw new MessageCodeError(ErrorCode.USER_RUD_MISSING_ID);
  }
  const target = await repozitory.findOne({ where: { id, deleted_at: IsNull() } });
  if (!target) {
    throw new MessageCodeError(ErrorCode.USER_NOT_FOUND);
  }
  target.deleted_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

  await repozitory.save(target);
};

export const getPagesCount = (records: number): number => {
  let pages = 1;

  if (moreThen(records, 10)) {
    pages = Math.ceil(records / 10);
  }

  return pages;
};

export const parseToState = (body: CreateStateDto, user: User): object => {
  const organization = user.organization;
  const state = {
    ...body,
    features: JSON.stringify(body.features),
    user,
    organization,
  };

  return state;
};

export const filterByOrganization = (records, organization): any[] => {
  return records.filter(record => record.organization.id === organization.id);
};

export const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

export const randomValueHex = (len) => {
  return crypto.randomBytes(Math.ceil(len / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, len).toUpperCase();   // return required number of characters
};

export const merge = (obj: object) => {
  const mergedObj = {};

  const mergeNestedObj = (nestedObj: object) => {
    for (const key in nestedObj) {
      if (nestedObj.hasOwnProperty(key)) {
        const element = nestedObj[key];
        if (isObject(element)) {
          mergeNestedObj(element);
        } else {
          mergedObj[key] = element;
        }
      }
    }
  };

  mergeNestedObj(obj);

  return mergedObj;
};

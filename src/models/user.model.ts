import { Entity, Null, model, property } from '@loopback/repository';
import { genSalt, hash, compare } from 'bcryptjs';

@model({ settings: { strict: false, mysql: { schema: 'user_management', table: 'users' } } })
export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      "columnName": "first_name"
    },
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      "columnName": "last_name"
    },
  })
  lastName: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'number',
    default: 2,
    mysql: {
      "columnName": "role_id"
    },
  })
  roleId: number;

  @property({
    type: 'boolean',
    default: true,
    mysql: {
      "columnName": "is_active"
    },
  })
  isActive: boolean;

  @property({
    type: 'string',
    default: null,
    mysql: {
      "columnName": "app_key"
    },
  })
  appKey: string;

  @property({
    type: 'number',
    default: null,
    mysql: {
      "columnName": "status"
    },
  })
  status: number;

  @property({
    type: 'boolean',
    default: null,
    mysql: {
      "columnName": "is_delete"
    },
  })
  isDelete: boolean;

  @property({
    type: 'date',
    default: () => new Date(),
    mysql: {
      "columnName": "create_date"
    },
  })
  createDate?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
    mysql: {
      "columnName": "update_date"
    },
  })
  updateDate?: Date;

  @property({
    type: 'date',
    default: Null,
    mysql: {
      "columnName": "delete_date"
    },
  })
  deleteDate?: Date;

  @property({
    type: 'boolean',
    default: false,
    mysql: {
      "columnName": "is_email_verified"
    },
  })
  isEmailVerified: boolean;

  @property({
    type: 'string',
    default: null,
    mysql: {
      "columnName": "reset_password_token"
    },
  })
  resetPasswordToken: string;

  @property({
    type: 'string',
    default: null,
    mysql: {
      "columnName": "token"
    },
  })
  token: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
  
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = Users & UserRelations;

@model()
class Credentials extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<Credentials>) {
    super(data);
  }
}
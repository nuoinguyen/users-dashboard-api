import {Entity, Null, model, property} from '@loopback/repository';

@model({ settings: { strict: false, mysql: { schema: 'user_management', table: 'app_key' } } })
export class AppKey extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    mysql: {
      "columnName": "user_id"
    },
  })
  userId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;
  @property({
    type: 'string',
    required: true,
  })
  platform: string;

  @property({
    type: 'string',
  })
  key: string;

  @property({
    type: 'boolean',
    default: true,
    mysql: {
      "columnName": "is_active"
    },
  })
  isActive?: boolean;

  @property({
    type: 'number',
    default: false
  })
  status?: number;

  @property({
    type: 'date',
    default: () => new Date(),
    mysql: {
      "columnName": "create_date",
    },
  })
  createDate?: string;

  @property({
    type: 'date',
    default: () => new Date(),
    mysql: {
      "columnName": "update_date",
    },
  })
  updateDate?: string;

  @property({
    type: 'date',
    default: Null,
    mysql: {
      "columnName": "delete_date"
    },
  })
  deleteDate?: string;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AppKey>) {
    super(data);
  }
}

export interface AppKeyRelations {
  // describe navigational properties here
}

export type AppKeyWithRelations = AppKey & AppKeyRelations;

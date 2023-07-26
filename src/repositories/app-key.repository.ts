import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AppKey, AppKeyRelations} from '../models';

export class AppKeyRepository extends DefaultCrudRepository<
  AppKey,
  typeof AppKey.prototype.id,
  AppKeyRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(AppKey, dataSource);
  }
}

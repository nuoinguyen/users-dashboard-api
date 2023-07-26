import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { AppKey } from '../models';
import { AppKeyRepository } from '../repositories';

export class AppKeyController {
  constructor(
    @repository(AppKeyRepository)
    public appKeyRepository: AppKeyRepository,
  ) { }

  @post('/app-keys')
  @response(200, {
    description: 'AppKey model instance',
    content: { 'application/json': { schema: getModelSchemaRef(AppKey) } },
  })
  async create(@requestBody() appKey: AppKey ) {
    const userId = appKey.userId;
    appKey.key = userId?.toString() + '_' + Math.random().toString(36).slice(2) + '-' + Math.random().toString(36).slice(2);

    let res =  this.appKeyRepository.create(appKey);
    return {statusCode: 200 , data: res};
  }

  @get('/app-keys/count')
  @response(200, {
    description: 'AppKey model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(AppKey) where?: Where<AppKey>,
  ): Promise<Count> {
    return this.appKeyRepository.count(where);
  }

  @get('/app-keys')
  async find(
    @param.filter(AppKey) filter?: Filter<AppKey>,
  ): Promise<AppKey[]> {
    return this.appKeyRepository.find(filter);
  }

  @patch('/app-keys')
  @response(200, {
    description: 'AppKey PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppKey, { partial: true }),
        },
      },
    })
    appKey: AppKey,
    @param.where(AppKey) where?: Where<AppKey>,
  ): Promise<Count> {
    return this.appKeyRepository.updateAll(appKey, where);
  }

  @get('/app-keys/{id}')
  @response(200, {
    description: 'AppKey model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AppKey, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AppKey, { exclude: 'where' }) filter?: FilterExcludingWhere<AppKey>
  ): Promise<AppKey> {
    return this.appKeyRepository.findById(id, filter);
  }

  @patch('/app-keys/{id}')
  @response(204, {
    description: 'AppKey PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppKey, { partial: true }),
        },
      },
    })
    appKey: AppKey,
  ): Promise<void> {
    await this.appKeyRepository.updateById(id, appKey);
  }

  @put('/app-keys/{id}')
  @response(204, {
    description: 'AppKey PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() appKey: AppKey,
  ): Promise<void> {
    await this.appKeyRepository.replaceById(id, appKey);
  }

  @del('/app-keys/{id}')
  @response(204, {
    description: 'AppKey DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.appKeyRepository.deleteById(id);
  }
}

import { BaseEntity, DeepPartial, DeleteResult, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export class BaseRepository<T extends BaseEntity> {
  public model: Repository<T>;

  constructor(repository: Repository<T>) {
    this.model = repository;
  }

  // async create(data: DeepPartial<T> | any): Promise<T | any> {
  //   console.log({ data });
  //   return this.model.save(data);
  // }

  async index(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: EntityId): Promise<T> {
    return this.model.findOne(id);
  }

  async findByIds(ids: [EntityId]): Promise<T[]> {
    return this.model.findByIds(ids);
  }

  async store(data: any): Promise<T> {
    return this.model.save(data);
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.model.update(id, data);
    return this.findById(id);
  }

  async delete(id: EntityId): Promise<DeleteResult> {
    return this.model.delete(id);
  }
}

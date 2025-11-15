import { Model, MongooseUpdateQueryOptions, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";

export abstract class AbstractRepository<T>{
    constructor(protected model : Model<T>){}
    async create(item:Partial <T>):Promise<T & Document>{
        const doc = new this.model(item);
        return (await doc.save()) as unknown as  T & Document ;
    }
    async exist(
        filter: RootFilterQuery<T>,
        projection?: ProjectionType<T>,
        options?: QueryOptions<T> & { populate?: any }
      ) {
        let query = this.model.findOne(filter, projection);
      
        if (options?.populate) {
          query = query.populate(options.populate);
        }
      
        return await query;
      }
      
    async update(
        filter:RootFilterQuery<T>,
        update:UpdateQuery<T>,
        options?:MongooseUpdateQueryOptions


    ){
        return await this.model.updateOne(filter,update,options)
    }
    async delete(
        filter:RootFilterQuery<T>
    ){
        return await this.model.deleteOne(filter)
    }
}
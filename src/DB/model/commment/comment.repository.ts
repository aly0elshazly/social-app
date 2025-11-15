import { FilterQuery } from "mongoose";
import { IComment } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import { Comment } from "./comment.model";
export class commentRepository extends AbstractRepository<IComment>{
    constructor(){
        super(Comment)
        
    }
    async getOne(filter:FilterQuery<IComment>){
        return await this.model.findOne(filter)
    }
}
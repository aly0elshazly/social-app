import { FilterQuery } from "mongoose";
import { IPost } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import { Post } from "./post.model";

export class PostRepository extends AbstractRepository<IPost>{
    constructor(){
        super(Post)
    }
    async getOne(filter:FilterQuery<IPost>){
        return await this.model.findOne(filter)
    }
}   
import { IUser } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import { User } from "./user.model";

export class UserRepository extends AbstractRepository<IUser>{
    constructor(){
        super(User);
    }
    async getAllUsers(){
        return await this.model.find();
    }
    async getUser(filter:Record<string,any>){
        return await this.model.findOne(filter).select("-password");
    }

}
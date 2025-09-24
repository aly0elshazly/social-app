import { Request,Response,NextFunction } from "express";
import { UserRepository } from "../../DB";
class UserService{
    private readonly userRepository = new UserRepository();
    constructor(){

    }

    getProfile= async (req : Request ,res : Response, next: NextFunction)=>{
        let user = await this.userRepository.getUser({_id : req.params.id})
        return res.status(200).json({messsage:"done",success:true,data:user})


    }
}
export default new UserService()
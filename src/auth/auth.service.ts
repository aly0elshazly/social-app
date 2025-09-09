import type{ NextFunction, Request, Response } from "express";
import { registerDTO } from "./auth.dto";
import { User } from "../DB/model/user/user.model";
import { ConflictException } from "../utils/error";
import { UserRepository } from "../DB/model/user/user.repository";
import { authFctoryService } from "./factory";

class Authservice {
    private userRepository = new UserRepository()
    private authFactoryService = new authFctoryService()
    constructor(){

    }

    register=async(req:Request,res:Response,next:NextFunction)=>{
        
        const registerDTO:registerDTO = req.body
        const userExist = await this.userRepository.exist({
            email:registerDTO.email
        })
        if(userExist){
            throw new ConflictException("user already exist")
        }
        const user = this.authFactoryService.register(registerDTO)
        
        // save into db
        const createduser = await this.userRepository.create(user)
        
        return res.status(202).json({
            message:"user created successfully ",
            success:true,
            data:createduser
        });


    };

};
export default new Authservice()    
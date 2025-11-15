import { NextFunction, Request, Response } from "express";
import { BadRequestException, Ipayload, IUser, NotAutherizedException, NotFoundException, verifyToken } from "../utils";
import { UserRepository } from "../DB";
import {TokenRepository} from "../DB"
import jwt from "jsonwebtoken";

    export const isAuthenticated = ()=>{
        return async(req:Request,res:Response,next:NextFunction)=>{
            const token = req.headers.authorization as string;
            if(!token){
                throw new BadRequestException("token is required")
            }
            const payload =verifyToken(token);
            const userRepository = new UserRepository();
            const user = await userRepository.exist({_id:payload._id},{},{
                populate:[{path:"friends",select:"fullname firstname lastname"}]
            })
            if(!user){
                throw new NotFoundException("user doesn't exist")
            }
            req.user =user as unknown as IUser;
            next()

        }
    }


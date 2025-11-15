import type{ NextFunction, Request, Response } from "express";
import {  loginDTO, refreshTokenDTO, registerDTO, VerifyDTO } from "./auth.dto";
import {  BadRequestException, compareHash, ConflictException, forBiddenException, generatetokens, Ipayload, NotFoundException, verifyToken } from "../../utils";
import { UserRepository } from "../../DB";
import { authFctoryService } from "./factory";
import { authProvider } from "./provider/auth.provider";
import { _discriminatedUnion } from "zod/v4/core";
import { devconfig } from "../../config/dev.config";
import { TokenRepository } from "../../DB/model/token/token.repository";
import jwt  from "jsonwebtoken";

class Authservice {
    private userRepository = new UserRepository()
    private authFactoryService = new authFctoryService()
    private tokenRepository = new TokenRepository()
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
        const user = await this.authFactoryService.createUser(registerDTO)
        
        // save into db
        const createduser = await this.userRepository.create(user)

        
        return res.status(202).json({
            message:"user created successfully ",
            success:true,
            data:{id:createduser._id}
        });



    };
    verifyAcount = async(req:Request,res:Response,next:NextFunction)=>{
        const verifyDTO:VerifyDTO = req.body;
        await authProvider.checkOtp(verifyDTO);
        await this.userRepository.update(
            {email:verifyDTO.email},
            {isVerified:true,$unset:{otp:"",otpExpireyAt:""}}
            )
            


        return res.sendStatus(204)
    }
    login = async(req:Request,res:Response,next:NextFunction)=>{
        // get data 
        const loginDTO:loginDTO = req.body;
        //existence 
        const user = await this.userRepository.exist({email:loginDTO.email});
        if(!user){
            throw new forBiddenException("user not exist")
        }
        //compare password
        const comparePassword = await compareHash(loginDTO.password,user.password);
        if(!comparePassword){
            throw new forBiddenException("invalid credentials");
        }

        //generate token
        const accessToken = generatetokens({
            payload: {_id:user.id},
            options:{expiresIn: process.env.NODE_ENV === "production" ? "5m" : "20m"}
        });
        const refreshToken = generatetokens({
            payload:{_id:user.id},
            secretKey:devconfig.JWT_SECRET_R,
            options:{expiresIn:"7d"}

            
        })
         await this.tokenRepository.create({
            refreshToken: refreshToken,
            userId:user._id,
            expireAt:new Date(Date.now() + 7 * 24 * 60 *60 * 1000)
        })
        
        return res.status(201).json({
            message:"user loggedin successfully",
            success:true,
            data:{id:user._id,
                accesstoken:accessToken,
                refreshtoken:refreshToken
            }
        })


    }
    refreshToken = async(req:Request,res:Response) =>{
        const token = req.headers.authorization;
        let accessTokenUserId: string | undefined = undefined;
        if (!token) {
            throw new BadRequestException("token is required");
        }
        try {
            const payload = verifyToken(token);
            accessTokenUserId = payload._id;
       } catch (error: unknown){
           if ( error instanceof jwt.TokenExpiredError) {
               const accessToken = jwt.decode(token) as Ipayload;
               if (!accessToken || !accessToken._id) {
                   throw new BadRequestException("invalid token");
               }
               accessTokenUserId = accessToken._id;
           } else {
            throw error;
           }
       }

        const refreshDto: refreshTokenDTO = req.body;
        const payload = verifyToken(refreshDto.refreshToken, devconfig.JWT_SECRET_R);
        if (!accessTokenUserId || payload._id !== accessTokenUserId) {
            throw new BadRequestException("invalid data")
        }
        const user = await this.userRepository.exist({_id:payload._id})
        if (!user) {
            throw new NotFoundException("you are not here")
        }
        const accessToken = generatetokens({
            payload: {_id:user.id},
            options:{expiresIn: process.env.NODE_ENV === "production" ? "5m" : "20m"}
        });
        return res.status(201).json({
            message:"token refreshed successfully",
            data:accessToken

        })
    }

};
export default new Authservice()  
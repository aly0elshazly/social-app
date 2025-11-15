import { BadRequestException, NotFoundException } from "../../../utils";
import type{  Request, Response } from "express";

import { VerifyDTO } from "../auth.dto";
import { UserRepository } from "../../../DB";

export const authProvider ={ 
    async checkOtp(verifyDTO:VerifyDTO){

    const userRepository = new UserRepository(); 
    const userExist= await userRepository.exist({email:verifyDTO.email})
       
        if(!userExist){
            throw new NotFoundException("user not found")

        }
        if(userExist.isVerified == true){
            throw new BadRequestException("user already verified")
        }
        if(userExist.otp != verifyDTO.otp){
            throw new BadRequestException("invalid otp")

        }
        if(userExist.otpExpireyAt && userExist.otpExpireyAt < new Date()){

        }
    }

}
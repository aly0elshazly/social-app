import { Request,Response,NextFunction } from "express"
import { BadRequestException } from "../utils/error";
import { ZodObject } from "zod";

export const isValid = (schema : ZodObject)=>{
    return (req:Request ,res : Response , next : NextFunction)=>{
        let data = { ...req.body, ...req.params, ...req.query}

        const result = schema.safeParse(data);
        if(result.success == false){
            let errMessages = result.error.issues.map((issue)=>({
                path : issue.path[0],
                message : issue.message,

            }))
            throw new BadRequestException("validation error",errMessages)

        }
    }
}
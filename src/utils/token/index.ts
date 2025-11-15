import jwt, {  SignOptions } from "jsonwebtoken"
import { devconfig } from "../../config/dev.config"
import { Ipayload } from "../interface"
export const generatetokens = ({
    payload,
    secretKey = devconfig.JWT_SECRET_A as string,
    options
}:{
    payload:object,
    secretKey?:string | undefined,
    options?:SignOptions
})=>{
    return jwt.sign(payload,secretKey,options)
}

export const verifyToken = (
    token:string,
    secretKey:string = devconfig.JWT_SECRET_A as string
)=>{
    return jwt.verify(token,secretKey) as Ipayload;
}

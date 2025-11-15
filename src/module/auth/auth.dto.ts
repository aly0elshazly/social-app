import { GENDER } from "../../utils";

export interface registerDTO{
    fullname?:string;
    email:string;
    password:string;
    phonenumber?:string;
    gender:GENDER
}
export interface VerifyDTO{
    email:string;
    otp:string;
}
export interface loginDTO{
    email:string;
    password:string;
}
export interface refreshTokenDTO{
    refreshToken:string;
}
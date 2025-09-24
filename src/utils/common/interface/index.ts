import { USER_AGENT,GENDER,SYS_ROLE } from "../enum/index";
 export interface IUser{
    firstname:string;
    lastname:string;
    fullname?:string;
    email:string;
    password:string;
    credintalUpdatedAt:Date;
    phoneNumber?:string;
    role : SYS_ROLE;
    gender: GENDER;
    userAgent : USER_AGENT;
    otp?:string;
    otpExpireyAt?:Date;
    isVerified:boolean
    
}

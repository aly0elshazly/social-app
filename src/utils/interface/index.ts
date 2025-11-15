import { JwtPayload } from "jsonwebtoken";
import { USER_AGENT,GENDER,SYS_ROLE, REACTION } from "../enum/index";
import { ObjectId, Types } from "mongoose";
 export interface IUser extends Document{
    firstname:string;
    lastname:string;
    fullname?:string;
    email:string;
    tempEmail?:string;
    password:string;
    credintalUpdatedAt:Date;
    phoneNumber?:string;
    role : SYS_ROLE;
    gender: GENDER;
    userAgent : USER_AGENT;
    otp?:string;
    otpNewEmail?:string;
    otpExpireyAt?:Date;
    friends: Types.ObjectId[];
    sentRequests: Types.ObjectId[];
    receivedRequests: Types.ObjectId[];
    blockedUsers:Types.ObjectId[]
     isVerified:boolean;
    
}
export interface Itoken {
    userId : ObjectId;
    refreshToken: string;
    expireAt:Date;

}
export interface IComment{
    _id:ObjectId;
    userId:ObjectId;
    postId:ObjectId;
    parentId:ObjectId | null;
    content:String;
    attachments?:IAttachment[];
    reactions:IReaction[];
    mentions?:ObjectId[];
}
export interface IUser{
    _id:ObjectId
}
export interface IAttachment{
    url:string;
    id:string
}
export interface IReaction{
    reaction:REACTION;
    userId:ObjectId

}
export interface IPost{
    userId:ObjectId;
    content:string;
    reactions:IReaction[];
    attachments:IAttachment[]
    

}
export interface IPost{
    _id:ObjectId
}
export interface Ipayload extends JwtPayload{
    _id : string,
    role : string
}
declare module "express"{
    interface Request{
        user?:IUser & Document
    }
}
export interface IMessage{
    readonly _id:ObjectId
    content:string,
    sender:ObjectId,
    attachments?:IAttachment[],
    reactions?:IReaction[]
}
export interface Ichat{
    readonly _id:ObjectId

    users:ObjectId[],
    messages:ObjectId[]
}
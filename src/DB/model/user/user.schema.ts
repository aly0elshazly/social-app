import { Schema } from "mongoose";
import { IUser } from "../../../utils/common/interface";
import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";

export const userschema = new Schema <IUser>({
    firstname:{type:String,minlength:2,maxlength:20,required:true,trim:true},
    lastname:{type:String,minLength:2,maxlength:20,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:function(){
        if (this.userAgent==USER_AGENT.google) {
            return false;
        }
        return true;
    },},
    credintalUpdatedAt:Date,
    phoneNumber:String,
    role:{type:String,enum:SYS_ROLE,default:SYS_ROLE.user},
    gender:{ type:String,enum:GENDER,default:GENDER.male},
    userAgent:{type:String,enum:USER_AGENT,default:USER_AGENT.local},
    otp:String,
    otpExpireyAt:Date
     



    

},{timestamps:true});

userschema.virtual("fullname").get(function () {
    return this.firstname + " " +this.lastname
    
}).set(function(value:string){
    const[fname,lname] = value.split(" ");
    this.firstname = fname as string;
    this.lastname = lname as string


})
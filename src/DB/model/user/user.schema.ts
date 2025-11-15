import { Schema } from "mongoose";
import { IUser } from "../../../utils/interface";
import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/enum";
import { sendMail } from "../../../utils/email";

export const userschema = new Schema <IUser>({
    firstname:{type:String,minlength:2,maxlength:20,required:true,trim:true},
    lastname:{type:String,minLength:2,maxlength:20,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true},
    tempEmail:{type:String},
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
    
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
          default: [],
        },
      ],
      sentRequests: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
          default: [],
        },
      ],
      receivedRequests: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
          default: [],
        },
      ],
      blockedUsers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],

    
    otp:String,
    otpNewEmail:String,
    otpExpireyAt:Date,
    isVerified:{type:Boolean,default:false}
     



    

},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}});

userschema.virtual("fullname").get(function () {
    return this.firstname + " " +this.lastname
    
}).set(function(value:string){
    const[fname,lname] = value.split(" ");
    this.firstname = fname as string;
    this.lastname = lname as string


})

userschema.pre("save", async function(){
    if(this.userAgent != USER_AGENT.google && this.isNew == true    )
    await sendMail({
        to:this.email,
        subject:"confirm email",
        html:`<h1>your otp is ${this.otp}<h1>`,

    })

   

})

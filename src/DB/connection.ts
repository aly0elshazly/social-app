import mongoose from "mongoose";
import { devconfig } from "../config/dev.config";

export const connectdb = async ()=>{
   await mongoose.connect(devconfig.DB_URL as string).then(()=>{
    console.log("db connected successfully");
    
   }).catch((err)=>{
    ("failed to connect ")
   })

}
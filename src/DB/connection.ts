import mongoose from "mongoose";

export const connectdb = async ()=>{
   await mongoose.connect(process.env.DB_URL as string).then(()=>{
    console.log("db connected successfully");
    
   }).catch((err)=>{
    ("failed to connect ")
   })

}
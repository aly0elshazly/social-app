import { type Express } from "express";
import authrouter from "./auth/auth.controller";
import { connectdb } from "./DB/connection";
export function bootstrap(app:Express,express:any){
    connectdb()

    app.use(express.json())
    //auth
    app.use("/auth",authrouter)

    app.use((req,res,next)=>{
    return res.status(404).json({message:"invalid router",success:false})
   })


}
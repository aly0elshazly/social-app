import {   type Express } from "express";
import type{ NextFunction, Request, Response } from "express";
import { authrouter,userRouter } from "./module";
import { connectdb } from "./DB";
import { AppError } from "./utils";
export function bootstrap(app:Express,express:any){
    connectdb()

    app.use(express.json())
    //auth
    app.use("/auth",authrouter)
    // user
    app.use("/user",userRouter)

    app.use((req,res,next)=>{
    return res.status(404).json({message:"invalid router",success:false})
   })
   // global error handler
   app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.statusCode).json({
      message: err.message,
      success:false,
      errDetails:err.errorDetails
    })

  
  });
}
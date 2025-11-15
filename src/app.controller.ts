import {   type Express } from "express";
import type{ NextFunction, Request, Response } from "express";
import { authrouter,commentRouter,postRouter,userRouter,chatRouter } from "./module";
import { connectdb } from "./DB";
import { AppError } from "./utils";
import cors from "cors"
export function bootstrap(app:Express,express:any){
    connectdb()

    app.use(express.json())
    app.use(cors({origin:"*"})) 
    //auth
    app.use("/auth",authrouter)
    // user
    app.use("/user",userRouter)
    //post
    app.use("/post",postRouter)
    app.use("/comment",commentRouter)
    app.use("chat",chatRouter)

    app.use((req,res,next)=>{
    return res.status(404).json({message:"invalid router",success:false})
   })
   // global error handler
   app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    return res.status(statusCode).json({
      message: err.message,
      success:false,
      errDetails:err.errorDetails
    })

  
  });
}
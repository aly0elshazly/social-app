import express from "express";
import { bootstrap } from "./app.controller";
import { config } from "dotenv"; 

config({path:"./config/dev.env"})
const app = express();
const port = 3000;

bootstrap(app,express)

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
    
})

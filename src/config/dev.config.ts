import { config } from "dotenv"; 

config()

export const devconfig = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL,

    JWT_SECRET_A : process.env.JWT_SECRET_A,
    JWT_SECRET_R : process.env.JWT_SECRET_R,

    //cloud
   API_KEY : process.env.API_KEY,
   API_SECRET : process.env.API_SECRET,
   CLOUD_NAME : process.env.CLOUD_NAME,

   //email
    EMAIL_USER : process.env.EMAIL_USER,
    EMAIL_PASS : process.env.EMAIL_PASS,



}
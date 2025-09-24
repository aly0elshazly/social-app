import nodemailer from "nodemailer"
import { devconfig } from "../../config/dev.config"

export const sendMail = ()=>{
    nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:devconfig.EMAIL_USER,
            pass:devconfig.EMAIL_PASS
        }
    })
}
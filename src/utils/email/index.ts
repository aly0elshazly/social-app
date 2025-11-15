import nodemailer from "nodemailer"
import { devconfig } from "../../config/dev.config"
import { MailOptions } from "nodemailer/lib/sendmail-transport";

export const sendMail = async (mailOptions:MailOptions)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:devconfig.EMAIL_USER,
            pass:devconfig.EMAIL_PASS
        }
        
        
    });
    mailOptions.from = `social-app <${devconfig.EMAIL_USER}>`
    await transporter.sendMail(mailOptions)
}
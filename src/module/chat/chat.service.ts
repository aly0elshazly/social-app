import type{  Request, Response } from "express";
import { chatRepository } from "../../DB";

class ChatService{
    private readonly chatRepository = new chatRepository();
    getChat = async(req:Request,res:Response)=>{
        const {userId} = req.params;
        const userLoggedIn = req.user?._id;


        const chat = await this.chatRepository.exist({users:{$all:{userId,userLoggedIn}}})
        return res.status(202).json({
            message:"done",
            success:true,
            data:{chat}
        })
    }
}
export default new ChatService()
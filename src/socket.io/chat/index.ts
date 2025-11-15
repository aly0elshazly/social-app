import { Server, Socket } from "socket.io";
import { chatRepository, messageRepository } from "../../DB";
import { ObjectId } from "mongoose";

interface IsendMessage{
    message:string,destId:string

}
export const sendMessage = (socket:Socket,io:Server,connectedUsers:Map<string,string>)=>{
    return async (data:IsendMessage)=>{
        const destSocket = connectedUsers.get(data.destId)
        socket.emit("successMessage",data);
        io.to(destSocket!).emit("receiveMessage",data)
        const messageRepo = new messageRepository();
        const sender = socket.data.destId;
        const createdMessage = await messageRepo.create({
            content:data.message,
            sender:sender
        })
        const chatRepo = new chatRepository();

        const chat = await chatRepo.exist({
            users:[sender,data.destId],
        })
        if(!chat){
            await chatRepo.create({
                users:[sender,data.destId],
                messages:[createdMessage._id ]

            })
        }else{
            await chatRepo.update({
                _id:chat.id
            },
        {$push:{messages:createdMessage._id}})
        }
        
    }

}

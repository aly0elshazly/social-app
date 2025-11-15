import { Socket } from "socket.io";
import { NotFoundException, verifyToken } from "../../utils";
import { UserRepository } from "../../DB";

export const socketAuth = async (socket:Socket,next:Function)=>{
    try {
        const {authorizatioin} =socket.handshake.auth;
        const pyaload = verifyToken(authorizatioin);
        const userRepository = new UserRepository();
        const user = userRepository.getUser({_id:pyaload._id})
        if(!user) throw new NotFoundException("user not found")
        socket.data.user = user;
        next()

    } catch (error) {
        next(error)
    }
}
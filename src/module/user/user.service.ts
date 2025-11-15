import { Request,Response,NextFunction } from "express";
import { UserRepository } from "../../DB";
import { BadRequestException, compareHash, generateExpireyAt, generateHash, generateotp, NotFoundException, REACTION } from "../../utils";
import { sendMail } from "../../utils/email";
import { updatePassDTO } from "./user.dto";
import { ObjectId, Types } from "mongoose";
class UserService{
    private readonly userRepository = new UserRepository();
    constructor(){

    }

    getProfile= async (req : Request ,res : Response, next: NextFunction)=>{
        return res.status(200).json({messsage:"done",success:true,data:req.user})


    }
    updateEmail = async (req:Request,res:Response)=>{
        const {email} = req.body;
        const userEmail = req.user?.email
        const emailExist = await this.userRepository.exist({email:email})
        if(emailExist){
            throw new BadRequestException("email already exist")
        }
        if(req.user?.otpExpireyAt && req.user.otpExpireyAt.getTime() > Date.now()){
            throw new BadRequestException("otp not expired yet ")
        }
        const oldOtp = generateotp()
        const newOtp = generateotp()
        
        await this.userRepository.update(
            {email:userEmail },
        {$set:{
            tempEmail:email,
            otp:oldOtp,
            otpNewEmail:newOtp,
            otpExpireyAt:generateExpireyAt(5*60*60*1000) as unknown as Date
        }})
        await sendMail({
            to: userEmail!,
            subject: "Verify your old email",
            html: `<h1>Your old email verification code is ${oldOtp}</h1>`,
          });
          
          await sendMail({
            to: email,
            subject: "Verify your new email",
            html: `<h1>Your new email verification code is ${newOtp}</h1>`,
          });
          return res.status(200).json({
            message: "OTPs sent successfully to both emails.",
            success: true,
          });
        
          
    }
    replaceEmail = async (req:Request,res:Response)=>{
        const {oldCode,newCode} = req.body;
        const userEmail = req.user?.email;

        if(req.user?.otpExpireyAt?.getTime() as number < Date.now()  ){
            throw new BadRequestException("otp expired")
        }
        if(oldCode != req.user?.otp){
            throw new BadRequestException("invalid otp ")
        }
        if(newCode != req.user?.otpNewEmail){
            throw new BadRequestException("invalid otp")
        }
        await this.userRepository.update({email:userEmail},
            {
                email:req.user?.tempEmail,
                $unset:{
                tempEmail:1,
                otp:1,
                otpNewEmail:1,
                otpExpireyAt:1
            }}
        )
        return res.status(200).json({
            message: "email updated successfully",
            success: true,
          });
    }
    updatePassword = async(req:Request,res:Response)=>{
        const updatePassDTO : updatePassDTO = req.body;
        const userId = req.user?._id;

        const user = await this.userRepository.exist({id:userId})
        if(!user){
            throw new NotFoundException("user not found")
        }

        const isMatch = await compareHash(updatePassDTO.password,updatePassDTO.newPassword)
        if(!isMatch){
            throw new BadRequestException("password not correct")
        }
        if(updatePassDTO.newPassword != updatePassDTO.confirmPassword){
            throw new BadRequestException("password does not match")
        }
        const hashNewPassword = await generateHash(updatePassDTO.newPassword)

        await this.userRepository.update(
            {id:userId},
            {$set:{password:hashNewPassword}}
        )
        return res.status(200).json({
            success:true,
            message:"password updated successfully"
        })
        
    }
    sendFriendRequest = async (req:Request,res:Response)=>{
        const {friendId} = req.params;
        const  userId = req.user!._id;
        
          const user = await this.userRepository.exist({ _id: userId });
          const friend = await this.userRepository.exist({ _id: friendId });
      
          if (!user || !friend) throw new NotFoundException("User not found");
          const friendObjectId = new Types.ObjectId(friendId);
          if (user.friends?.some((id) => id.equals(friendObjectId))) {
            throw new BadRequestException("Already friends");
          }
        
      
          if (user.sentRequests?.some((id) => id.equals(friendObjectId))) {
            throw new BadRequestException("Request already sent");
          }
        
      
          await this.userRepository.update(
            { _id: userId },
            { $push: { sentRequests: friendId } }
          );
          await this.userRepository.update(
            { _id: friendId },
            { $push: { receivedRequests: userId } }
          );
      
          return res.status(200).json({ success: true, message: "Request sent" });
        };
    acceptFriendRequest = async (req: Request, res: Response) => {
            const { friendId } = req.params;
            const userId = req.user!._id;
          
            const user = await this.userRepository.exist({ _id: userId });
            const friend = await this.userRepository.exist({ _id: friendId });
          
            if (!user || !friend) throw new NotFoundException("User not found");
          
            const friendObjectId = new Types.ObjectId(friendId);
          
            if (!user.receivedRequests?.some(id => id.equals(friendObjectId))) {
              throw new BadRequestException("No request from this user");
            }
          
            await this.userRepository.update(
              { _id: userId },
              {
                $pull: { receivedRequests: friendObjectId },
                $push: { friends: friendObjectId },
              }
            );
          
            await this.userRepository.update(
              { _id: friendObjectId },
              {
                $pull: { sentRequests: userId },
                $push: { friends: userId },
              }
            );
          
            return res.status(200).json({ success: true, message: "Friend request accepted" });
          };
          
    rejectFriendRequest = async (req: Request, res: Response) => {
            const { friendId } = req.params;
            const userId = req.user!._id;
          
            const friendObjectId = new Types.ObjectId(friendId);
          
            await this.userRepository.update(
              { _id: userId },
              { $pull: { receivedRequests: friendObjectId } }
            );
          
            await this.userRepository.update(
              { _id: friendObjectId },
              { $pull: { sentRequests: userId } }
            );
          
            return res.status(200).json({ success: true, message: "Friend request rejected" });
          };
        unfriend = async (req: Request, res: Response) => {
            const { friendId } = req.params;
            const userId = req.user!._id;
          
            const friendObjectId = new Types.ObjectId(friendId);
          
            const user = await this.userRepository.exist({ _id: userId });
            const friend = await this.userRepository.exist({ _id: friendObjectId });
          
            if (!user || !friend) throw new NotFoundException("User not found");
          
            if (!user.friends?.some(id => id.equals(friendObjectId))) {
              throw new BadRequestException("You are not friend with this user");
            }
          
            await this.userRepository.update(
              { _id: userId },
              { $pull: { friends: friendObjectId } }
            );
          
            await this.userRepository.update(
              { _id: friendId },
              { $pull: { friends: userId } }
            );
          
            return res.status(200).json({ success: true, message: "Unfriended successfully" });
          };
        blockUser = async (req: Request, res: Response) => {
            const { friendId } = req.params;
            const userId = req.user!._id;
          
            const friendObjectId = new Types.ObjectId(friendId);
          
            const user = await this.userRepository.exist({ _id: userId });
            const friend = await this.userRepository.exist({ _id: friendObjectId });
          
            if (!user || !friend) throw new NotFoundException("User not found");
          
            if (user.blockedUsers?.some(id => id.equals(friendObjectId))) {
              throw new BadRequestException("User already blocked");
            }
          
            await this.userRepository.update(
              { _id: userId },
              {
                $pull: {
                  friends: friendId,
                  sentRequests: friendId,
                  receivedRequests: friendId,
                },
                $push: { blockedUsers: friendId },
              }
            );
          
            await this.userRepository.update(
              { _id: friendId },
              {
                $pull: {
                  friends: userId,
                  sentRequests: userId,
                  receivedRequests: userId,
                },
              }
            );
          
            return res.status(200).json({
              success: true,
              message: "User blocked successfully",
            });
          };
          

      
    }


export default new UserService()
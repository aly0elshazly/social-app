import { NextFunction, Request, Response } from "express"
import { CreatePostDto } from "./post.dto"
import { PostFactoryService } from "./factory";
import { IUser, NotAutherizedException, NotFoundException, REACTION } from "../../utils";
import { PostRepository } from "../../DB/model/post/post.repository";
import mongoose from "mongoose";
import { populate } from "dotenv";
import { addReactionProvider } from "../../utils/common/reaction.provider";

class postService{
    private readonly postFactoryService = new PostFactoryService();
    private readonly postRepository = new PostRepository
    public createPost=async(req:Request,res:Response,next:NextFunction)=>{
        const createPostDto:CreatePostDto = req.body;
        // factory >> prepare data >> post entity >> repository >> post entity >> db
        const post = this.postFactoryService.createPost(createPostDto,req.user!)
        const createdPost = await this.postRepository.create(post);
        

        return res.status(201).json({
            message:"post created successfully",
            success:true,
            data:{createdPost}

        })



    }
    public addReaction =  async(req:Request,res:Response,next:NextFunction)=>{
        const {postId} = req.params;
        const {reaction} = req.body;
        const  userId = req.user!._id;

        await addReactionProvider(this.postRepository,postId,userId,reaction)

        return res.status(200).json({ success: true, message: "Reaction added/updated successfully" });

    }
    public getSpecificPost = async (req: Request, res: Response) => {
        const { postId } = req.params;
      
        const post = await this.postRepository.exist(
          { _id: new mongoose.Types.ObjectId(postId) },
          {},
          { populate:[{ path: "userId", select: "fullName firstName lastName" },
            {path:"reactions.userId",select:"fullName firstName lastName"},
            {path:"comments",match:{parentId:null}}
          ] } 
        );
        
      
        if (!post) {
          throw new NotFoundException("post not exist");
        }
      
        return res.status(200).json({
          message: "done",
          success: true,
          data: post,
        });
      };

      public deletePost =async (req:Request,res:Response)=>{
        const {id} = req.params;
        const postExist = await this.postRepository.exist({
            _id:id
        })
        if(!postExist){
            throw new NotFoundException("post not found")
        }
        if(postExist.userId.toString() != req.user?._id.toString()){
            throw new NotAutherizedException("invalid credintials")
        }
        await this.postRepository.delete({
            _id:id
        })
        return res.status(201).json({
            message:"post deleted successfully"
        })

    
    }
    }

      
export default new postService()
import { Request, Response } from "express";
import { commentRepository } from "../../DB/model/commment/comment.repository";
import { PostRepository } from "../../DB/model/post/post.repository";
import { IComment, IPost, NotAutherizedException, NotFoundException } from "../../utils";
import { CommentFactoryService } from "./factory";
import { CreateCommentDTO } from "./comment.dto";
import { date } from "zod";
import { addReactionProvider } from "../../utils/common/reaction.provider";

class CommentService{
    private readonly postRepository = new PostRepository();
    private readonly commentRepository = new commentRepository();
    private readonly commentFactoryService = new CommentFactoryService()

    public create = async (req:Request,res:Response)=>{
        const{postId,id} = req.params;
        const CreateCommentDTO:CreateCommentDTO = req.body;

        const postExist = await this.postRepository.exist({_id:postId});
        if(!postExist){
            throw new NotFoundException("post not exist")
        }
        let commentExist : IComment | any = undefined
        if(id){
             commentExist = await this.commentRepository.exist({_id:id});
            if(!commentExist){
                throw new NotFoundException("comment not found ")
            }

        }
       const comment =  this.commentFactoryService.CreateComment(CreateCommentDTO,req.user!,postExist,commentExist); 
       const createdComment = await this.commentRepository.create(comment);
        
       return res.status(201).json({
        message:"comment created successfully",
        success:true,
        date:{createdComment}
       })
       
       


    }

    public getSpecificComment = async(req:Request,res:Response)=>{
        const{id} = req.params;
        const commentExist = await this.commentRepository.exist({_id:id}, {}, {populate:"replies"})
        if(!commentExist){
            throw new NotFoundException("comment not found")
        }

        return res.status(202).json({
            message:"sucessfully",
            data:{commentExist}
        })
    }
    public addRaction = async (req:Request,res:Response)=>{
                const {commentId} = req.params;
                const {reaction} = req.body;
                const  userId = req.user!._id;
        
                await addReactionProvider(this.commentRepository,commentId,userId,reaction)
        
                return res.status(200).json({ success: true, message: "Reaction added/updated successfully" });
        
            }

    
    
    public deleteComment = async(req:Request,res:Response)=>{
        const{id} = req.params;
        const commentExist = await this.commentRepository.exist({_id:id},{},{
            populate:[{path:"postId",select:"userId"}]
        })
        if(!commentExist){
            throw new NotFoundException("comment not found")
        }
        if (
            commentExist.userId.toString() !== req.user?._id.toString() &&
            (commentExist.postId as unknown as IPost).userId.toString() !== req.user?._id.toString()
          ) {
            throw new NotAutherizedException("invalid credentials");
          }
        
        await this.commentRepository.delete({_id:id})
        return res.status(202).json({
            message:"comment deleted successfully"
        })

    }
}
export default new CommentService()
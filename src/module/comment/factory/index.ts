import { IComment, IPost, IUser } from "../../../utils";
import { CreateCommentDTO } from "../comment.dto";
import { Comment } from "../entity";

export class CommentFactoryService{
    CreateComment(CreateCommentDTO:CreateCommentDTO,user:IUser,post:IPost,comment:IComment){
        const newComment = new Comment();

        newComment.content = CreateCommentDTO.content;
        newComment.userId = user._id;
        newComment.postId = post._id || comment?.postId;
        newComment.parentId = comment?._id;
        newComment.reactions = [];
        return newComment





    }
}
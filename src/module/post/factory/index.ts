import { IUser } from "../../../utils";
import { Post } from "../entity";
import { CreatePostDto } from "../post.dto";
import { IAttachment, IReaction } from "../../../utils";


export class PostFactoryService{
    createPost(createPostDto:CreatePostDto,user:IUser){
        const newPost = new Post();

        newPost.content = createPostDto.content;
        newPost.userId = user._id;
        newPost.reactions =[]
        newPost.attachments = []; 
        return newPost
    }
    
}

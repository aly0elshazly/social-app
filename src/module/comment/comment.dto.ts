import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../../utils";

export interface CreateCommentDTO{
    userId:ObjectId;
    postId:ObjectId;
    parentId:ObjectId;
    content:String;
    attachments?:IAttachment;
    reactions:IReaction[];
    mentions?:ObjectId[];

}

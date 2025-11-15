import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../../../utils";

export class Comment{
    userId!:ObjectId;
    postId!:ObjectId;
    content!:String;
    parentId!:ObjectId;
    reactions!:IReaction[];
    attachments?:IAttachment[];
    

}
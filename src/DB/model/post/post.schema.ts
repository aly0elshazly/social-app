import { Schema } from "mongoose";
import { IPost } from "../../../utils";
import { reactionSchema } from "../common";
import { Comment } from "../commment/comment.model";


export const postSchema = new Schema<IPost>(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        content:{
            type:String,
            required : function(){
                if(this.attachments && this.attachments.length >0 ) return false;
                return true

            },
            trim:true
        },
        reactions:[reactionSchema]





},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})
postSchema.virtual("comments",{
    localField:"_id",
    foreignField:"postId",
    ref:"Comment"

})

postSchema.pre("deleteOne",async function(next){
    const filter = typeof this.getFilter == "function" ? this.getFilter():{};
    // delete reactions todo  
    await Comment.deleteMany({postId:filter._id});
    next()
})
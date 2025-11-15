import { ObjectId } from "mongoose";
import { commentRepository } from "../../DB";
import { PostRepository } from "../../DB";
import { REACTION } from "../enum";
import { NotFoundException } from "../error";

export const  addReactionProvider =  async(
    repo:commentRepository | PostRepository ,
    id:string | undefined,
    userId:ObjectId,
    reaction:string
    ) => { 
    

    const postExist = await repo.exist({_id:id});

    if(!postExist){
        throw new NotFoundException("post not found")
    }
    let userReacted = postExist.reactions.findIndex((reaction)=>{
       return reaction.userId.toString() == userId.toString()
    });
    if(userReacted === -1){
       await repo.update({
        _id:id
       },
    {
        $push:{reactions:{
            reaction:[null,undefined,""].includes(reaction)?REACTION.like:reaction,
            userId
        }}
    })
    }
    else if([undefined,null,""].includes(reaction)){
        await repo.update({
            _id:id
        },
    {$pull:{reactions:postExist.reactions[userReacted]}})

    }
    else{
        await repo.update(
            {_id:id,"reactions.userId":userId},
            {"reactions.$.reaction":reaction}
        )
    }

}

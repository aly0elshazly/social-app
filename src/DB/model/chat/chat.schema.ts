import { Schema, Types } from "mongoose";
import { Ichat,  } from "../../../utils";

export const chatSchema = new Schema<Ichat>({
    users:[{type:Schema.Types.ObjectId,ref:"User"}],
    messages:[{type:Schema.Types.ObjectId,ref:"Message"}]
},{timestamps:true})

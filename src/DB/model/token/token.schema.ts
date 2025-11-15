import { Schema } from "mongoose";
import { Itoken } from "../../../utils";

export const tokenSchema = new Schema<Itoken>(
    {
        userId:{
           type: Schema.Types.ObjectId,
           ref:"User",
           required:true

        },
        refreshToken:{
            type:String
        },
        expireAt:{
            type:Date
        }


    }
)
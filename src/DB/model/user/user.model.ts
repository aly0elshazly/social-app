import { model } from "mongoose";
import { userschema } from "./user.schema";
import { IUser } from "../../../utils/common/interface";

export const User = model<IUser>("User",userschema)
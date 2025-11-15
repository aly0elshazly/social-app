import {z} from "zod"
import { GENDER } from "../../utils/enum"

export const registerSchema = z.object({
    fullname:z.string().min(2).max(20) ,
    email:z.email() ,
    password:z.string() ,
    phonenumber:z.string() ,
    gender:z.enum(GENDER) ,


})
export type RegisterDTO = z.infer<typeof registerSchema>;


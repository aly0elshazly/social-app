import { GENDER } from "../utils/common/enum";

export interface registerDTO{
    fullname?:string;
    email:string;
    password:string;
    phonenumber?:string;
    gender:GENDER
}
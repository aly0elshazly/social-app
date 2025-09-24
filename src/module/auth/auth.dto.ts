import { GENDER } from "../../utils";

export interface registerDTO{
    fullname?:string;
    email:string;
    password:string;
    phonenumber?:string;
    gender:GENDER
}
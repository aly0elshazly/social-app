import { GENDER, SYS_ROLE, USER_AGENT } from "../../utils/common/enum";
import { generateHash } from "../../utils/hash";
import { generateExpireyAt, generateotp } from "../../utils/otp";
import { registerDTO } from "../auth.dto";
import { User } from "../entity";

export class authFctoryService{
    register(registerDTO:registerDTO){
        const user = new User();
        user.fullname = registerDTO.fullname as string;
        user.email = registerDTO.email;
        user.password = generateHash(registerDTO.password);
        user.phoneNumber = registerDTO.phonenumber as string;
        user.otp = generateotp();
        user.otpExpireyAt = generateExpireyAt(5*60*60*1000) as unknown as Date;
        user.credintalUpdatedAt= Date.now() as unknown as Date;
        user.gender = registerDTO.gender;
        user.role = SYS_ROLE.user;
        user.userAgent = USER_AGENT.local
        return user;



    }
}
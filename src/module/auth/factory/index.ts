import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils";
import { generateHash } from "../../../utils/hash";
import { generateExpireyAt, generateotp } from "../../../utils";
import { registerDTO } from "../auth.dto";
import { User } from "../entity";

export class authFctoryService{
    async createUser(registerDTO:registerDTO){
        const user = new User();
        user.fullname = registerDTO.fullname as string;
        user.email = registerDTO.email;
        user.password = await generateHash(registerDTO.password);
        user.phoneNumber = registerDTO.phonenumber as string;
        user.otp = generateotp();
        user.otpExpireyAt = generateExpireyAt(5*60*60*1000) as unknown as Date;
        user.credintalUpdatedAt= Date.now() as unknown as Date;
        user.gender = registerDTO.gender;
        user.role = SYS_ROLE.user;
        user.userAgent = USER_AGENT.local;
        user.isVerified  = false;
        return user;



    }
}
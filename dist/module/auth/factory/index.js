"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFctoryService = void 0;
const utils_1 = require("../../../utils");
const hash_1 = require("../../../utils/hash");
const utils_2 = require("../../../utils");
const entity_1 = require("../entity");
class authFctoryService {
    async createUser(registerDTO) {
        const user = new entity_1.User();
        user.fullname = registerDTO.fullname;
        user.email = registerDTO.email;
        user.password = await (0, hash_1.generateHash)(registerDTO.password);
        user.phoneNumber = registerDTO.phonenumber;
        user.otp = (0, utils_2.generateotp)();
        user.otpExpireyAt = (0, utils_2.generateExpireyAt)(5 * 60 * 60 * 1000);
        user.credintalUpdatedAt = Date.now();
        user.gender = registerDTO.gender;
        user.role = utils_1.SYS_ROLE.user;
        user.userAgent = utils_1.USER_AGENT.local;
        user.isVerified = false;
        return user;
    }
}
exports.authFctoryService = authFctoryService;

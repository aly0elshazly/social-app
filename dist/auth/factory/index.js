"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFctoryService = void 0;
const enum_1 = require("../../utils/common/enum");
const hash_1 = require("../../utils/hash");
const otp_1 = require("../../utils/otp");
const entity_1 = require("../entity");
class authFctoryService {
    register(registerDTO) {
        const user = new entity_1.User();
        user.fullname = registerDTO.fullname;
        user.email = registerDTO.email;
        user.password = (0, hash_1.generateHash)(registerDTO.password);
        user.phoneNumber = registerDTO.phonenumber;
        user.otp = (0, otp_1.generateotp)();
        user.otpExpireyAt = (0, otp_1.generateExpireyAt)(5 * 60 * 60 * 1000);
        user.credintalUpdatedAt = Date.now();
        user.gender = registerDTO.gender;
        user.role = enum_1.SYS_ROLE.user;
        user.userAgent = enum_1.USER_AGENT.local;
        return user;
    }
}
exports.authFctoryService = authFctoryService;

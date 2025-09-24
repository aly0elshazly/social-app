"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
const enum_1 = require("../../utils/common/enum");
exports.registerSchema = zod_1.z.object({
    fullname: zod_1.z.string().min(2).max(20),
    email: zod_1.z.email(),
    password: zod_1.z.string(),
    phonenumber: zod_1.z.string(),
    gender: zod_1.z.enum(enum_1.GENDER),
});

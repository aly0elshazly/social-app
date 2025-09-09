"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userschema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
exports.userschema = new mongoose_1.Schema({
    firstname: { type: String, minlength: 2, maxlength: 20, required: true, trim: true },
    lastname: { type: String, minLength: 2, maxlength: 20, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: function () {
            if (this.userAgent == enum_1.USER_AGENT.google) {
                return false;
            }
            return true;
        }, },
    credintalUpdatedAt: Date,
    phoneNumber: String,
    role: { type: String, enum: enum_1.SYS_ROLE, default: enum_1.SYS_ROLE.user },
    gender: { type: String, enum: enum_1.GENDER, default: enum_1.GENDER.male },
    userAgent: { type: String, enum: enum_1.USER_AGENT, default: enum_1.USER_AGENT.local },
    otp: String,
    otpExpireyAt: Date
}, { timestamps: true });
exports.userschema.virtual("fullname").get(function () {
    return this.firstname + " " + this.lastname;
}).set(function (value) {
    const [fname, lname] = value.split(" ");
    this.firstname = fname;
    this.lastname = lname;
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExpireyAt = exports.generateotp = void 0;
const generateotp = () => {
    return Math.floor(Math.random() * 99999 + 10000);
};
exports.generateotp = generateotp;
const generateExpireyAt = (time) => {
    return Date.now() + time;
};
exports.generateExpireyAt = generateExpireyAt;

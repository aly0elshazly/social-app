"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const user_repository_1 = require("../DB/model/user/user.repository");
const factory_1 = require("./factory");
class Authservice {
    userRepository = new user_repository_1.UserRepository();
    authFactoryService = new factory_1.authFctoryService();
    constructor() {
    }
    register = async (req, res, next) => {
        const registerDTO = req.body;
        const userExist = await this.userRepository.exist({
            email: registerDTO.email
        });
        if (userExist) {
            throw new error_1.ConflictException("user already exist");
        }
        const user = this.authFactoryService.register(registerDTO);
        // save into db
        const createduser = await this.userRepository.create(user);
        return res.status(202).json({
            message: "user created successfully ",
            success: true,
            data: createduser
        });
    };
}
;
exports.default = new Authservice();

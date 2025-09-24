"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const DB_1 = require("../../DB");
const factory_1 = require("./factory");
class Authservice {
    userRepository = new DB_1.UserRepository();
    authFactoryService = new factory_1.authFctoryService();
    constructor() {
    }
    register = async (req, res, next) => {
        const registerDTO = req.body;
        const userExist = await this.userRepository.exist({
            email: registerDTO.email
        });
        if (userExist) {
            throw new utils_1.ConflictException("user already exist");
        }
        const user = await this.authFactoryService.createUser(registerDTO);
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

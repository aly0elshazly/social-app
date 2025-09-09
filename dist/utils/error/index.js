"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = exports.NotAutherizedException = exports.NotFoundException = exports.ConflictException = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
class ConflictException extends AppError {
    constructor(messsage) {
        super(messsage, 409);
    }
}
exports.ConflictException = ConflictException;
class NotFoundException extends AppError {
    constructor(messsage) {
        super(messsage, 404);
    }
}
exports.NotFoundException = NotFoundException;
class NotAutherizedException extends AppError {
    constructor(messsage) {
        super(messsage, 401);
    }
}
exports.NotAutherizedException = NotAutherizedException;
class BadRequestException extends AppError {
    constructor(messsage) {
        super(messsage, 400);
    }
}
exports.BadRequestException = BadRequestException;

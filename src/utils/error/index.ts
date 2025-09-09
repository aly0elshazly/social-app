export class AppError extends Error{
    constructor(message:string,public statusCode:number){
        super(message)
    }

}
export class ConflictException extends AppError{
    constructor(messsage:string){
        super(messsage,409)
    }
}
export class NotFoundException extends AppError{
    constructor(messsage:string){
        super(messsage,404)
    }
}

export class NotAutherizedException extends AppError{
    constructor(messsage:string){
        super(messsage,401)
    }
}

export class BadRequestException extends AppError{
    constructor(messsage:string){
        super(messsage,400)
    }
}



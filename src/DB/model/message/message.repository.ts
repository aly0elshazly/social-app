import { IMessage } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import { Message } from "./message.model";

export class messageRepository extends AbstractRepository<IMessage>{
    constructor(){
        super(Message)
    }
    
} 
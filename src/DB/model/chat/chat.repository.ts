import { Ichat, IMessage } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import { Chat } from "./chat.model";

export class chatRepository extends AbstractRepository<Ichat>{
    constructor(){
        super(Chat)
    }
    
} 
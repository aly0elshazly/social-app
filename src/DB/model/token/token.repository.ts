import { Itoken } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import { Token } from "./token.model";

export class TokenRepository extends AbstractRepository<Itoken>{
    constructor (){
        super(Token)
    }

}
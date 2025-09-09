import { Router } from "express"
import authservice from "./auth.service";
const authrouter = Router();

authrouter.get("/register",authservice.register)

export default authrouter;


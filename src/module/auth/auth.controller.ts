import { Router } from "express"
import authService from "./auth.service";
import { isAuthenticated } from "../../middleware/auth.middleware";
const authrouter = Router();

authrouter.get("/register",authService.register)
authrouter.get("/verify",authService.verifyAcount)
authrouter.post("/login",authService.login)
authrouter.post("/refreshToken",authService.refreshToken)

export default authrouter;


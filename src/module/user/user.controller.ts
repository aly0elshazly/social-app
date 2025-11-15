import { Router } from "express";
import userService from "./user.service";
import { isAuthenticated } from "../../middleware/auth.middleware";
const userRouter =  Router();
userRouter.get("/profile",isAuthenticated(),userService.getProfile)
userRouter.post("/updateEmail",isAuthenticated(),userService.updateEmail)
userRouter.post("/replaceEmail",isAuthenticated(),userService.replaceEmail)
userRouter.post("/:friendId",isAuthenticated(),userService.sendFriendRequest)
userRouter.get("/:friendId",isAuthenticated(),userService.acceptFriendRequest)
userRouter.delete("/:friendId",isAuthenticated(),userService.rejectFriendRequest)
userRouter.post("/unfriend/:friendId", isAuthenticated(), userService.unfriend)
userRouter.post("/block/:friendId", isAuthenticated(), userService.blockUser)

export default userRouter;

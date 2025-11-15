import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import commentService from "./comment.service";

export const commentRouter =  Router({mergeParams:true});

commentRouter.post("{/:id}",isAuthenticated(),commentService.create);
commentRouter.get("/:id",isAuthenticated(),commentService.getSpecificComment)
commentRouter.delete(("/:id"),isAuthenticated(),commentService.deleteComment)
commentRouter.patch("/:commentId",isAuthenticated,commentService.addRaction)
export default commentRouter
import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middleware";
import postService from "./post.service";
import { commentRouter } from "../comment/comment.controller";

const postRouter =  Router();
postRouter.use("/:postId/comment",commentRouter)
postRouter.post("/createpost",isAuthenticated(),postService.createPost)
postRouter.patch("/:postId",isAuthenticated(),postService.addReaction)
postRouter.get("/:postId",postService.getSpecificPost)
postRouter.delete("/:id",isAuthenticated(),postService.deletePost)
export default postRouter;
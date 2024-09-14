import { Router } from "express";
import {
	createPost,
	getPostsByUser,
	getAllPosts,
	searchPosts,
} from "../controller/post.controller.js";
import {
	addComment,
	getComments,
	updateComments,
	deleteComments,
} from "../controller/comment.controller.js";

const postRouter = Router();
postRouter.route("/").post(createPost);
//get post by specific user
postRouter.get("/user/:userId", getPostsByUser);
postRouter.route("/").get(getAllPosts);
postRouter.route("/search").get(searchPosts);

// !postRouter.route("/:id").put(updatePost)
// !postRouter.route("/:id").delete(deletePost)

postRouter.route("/:id/comment").post(addComment);
postRouter.route("/:id/comment").get(getComments);
postRouter.route("/:id/comment/:commentId").put(updateComments);
postRouter.route("/:id/comment/:commentId").delete(deleteComments);

export default postRouter;

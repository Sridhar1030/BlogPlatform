import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addComment = asyncHandler(async (req, res) => {
	const { content, authorId } = req.body;
	console.log(req.params);
	const { postId } = req.params;
	if (!content || !authorId || !postId) {
		res.status(400);
		throw new Error("Content, authorId and postId are required");
	}

	const newComment = await Comment.create({ content, authorId, postId });
	res.status(201).json({
		message: "Comment created successfully",
		comment: newComment,
	});
});

const getComments = asyncHandler(async (req, res) => {
	const { postId } = req.params;

	const comments = await Comment.find({ postId });

	if (!comments.length) {
		res.status(404);
		throw new Error("No comments found for this post");
	}

	res.status(200).json({
		message: "number of posts found = " + comments.length,
		comments,
	});
});

const updateComments = asyncHandler(async (req, res) => {
	const { commentId } = req.params;
	const { content } = req.body;

	if (!content) {
		res.status(400);
		throw new Error("Content is required");
	}

	const updatedComment = await Comment.findByIdAndUpdate(
		commentId,
		{ content },
		{ new: true }
	);

	if (!updatedComment) {
		res.status(404);
		throw new Error("Comment not found");
	}

	res.status(200).json({
		message: "Comment updated successfully",
		comment: updatedComment,
	});
});

const deleteComments = asyncHandler(async (req, res) => {
	const { commentId } = req.params;

	const deletedComment = await Comment.findByIdAndDelete(commentId);

	if (!deletedComment) {
		res.status(404);
		throw new Error("Comment not found");
	}

	res.status(200).json({
		message: "Comment deleted successfully",
	});
});

export { addComment, getComments, updateComments, deleteComments };

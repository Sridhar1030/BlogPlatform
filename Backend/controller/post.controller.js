import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
	const { title, content, authorId } = req.body;

	if (!title || !content || !authorId) {
		res.status(400);
		throw new Error("Title, content, and authorId are required");
	}

	const newPost = await Post.create({ title, content, authorId });
	res.status(201).json({
		message: "post created successfully",
		post: newPost,
	});
});

//!get post by specific user
const getPostsByUser = asyncHandler(async (req, res) => {
	const { userId } = req.params;

	const posts = await Post.find({ authorId: userId });

	if (!posts.length) {
		res.status(404);
		throw new Error("No posts found for this user");
	}

	res.status(200).json(posts);
});

//! get all posts
const getAllPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find({});
	if (!posts.length) {
		res.status(404);
		throw new Error("No posts found");
	}
	res.status(200).json(posts);
});
//!find specific post
const searchPosts = async (req, res) => {
	try {
		const { query } = req.query; // Get the search query from query parameters
		if (!query) {
			return res
				.status(400)
				.json({ message: "Search query is required" });
		}

		// Perform case-insensitive search for posts containing the query in the title
		const posts = await Post.find({$or:[
			{title: { $regex: query, $options: "i" }},
            {content:{$regex:query,$options:"i"}}
		]
    });

		if (posts.length === 0) {
			return res.status(404).json({ message: "No posts found" });
		}

		res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

export { createPost, getPostsByUser, getAllPosts ,searchPosts};

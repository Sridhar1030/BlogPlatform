import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true, // Assuming every post must have an author
		},
		commentIds: [
			{
				// Assuming a post can have multiple comments
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		tagIds: [
			{
				// Assuming a post can have multiple tags
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tag",
			},
		],
	},
	{
		timestamps: true,
	}
);

export const Post = mongoose.model("Post", PostSchema);

import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // Assuming every comment must have an author
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true, // Assuming every comment must belong to a post
        },
    },
    {
        timestamps: true,
    }
);

export const Comment = mongoose.model("Comment", CommentSchema);
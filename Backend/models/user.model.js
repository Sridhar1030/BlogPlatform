import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
		},

		password: {
			type: String,
			required: true,
		},

		bio: {
			type: String,
			default: "",
		},
		profilePicture: {
			type: String,
			default: "",
		},
		role: {
			type: String,
			required: true,
			default: "user",
		},
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

// Compare password during login
userSchema.methods.checkPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			id: this._id,
			username: this.username,
			email: this.email,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
};

export const User = mongoose.model("User", userSchema);

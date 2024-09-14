import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Generate access and refresh token
const generateAccessTokenAndRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);

		// Generate access token and refresh token
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		// Save the refresh token in the database
		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new Error(
			"Something went wrong while generating refresh and access token"
		);
	}
};

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	// Check if all fields are provided
	if (!email?.trim() || !password?.trim() || !username?.trim()) {
		res.status(400);
		throw new Error("All fields are required");
	}

	const userExists = await User.findOne({ $or: [{ email }, { username }] });
	if (userExists) {
		res.status(400);
		throw new Error("User with that email or username already exists");
	}

	const user = await User.create({ username, email, password });

	if (!user) {
		res.status(400);
		throw new Error("Invalid user data");
	}

	const { refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

	user.refreshToken = refreshToken;
	await user.save(); // Save the refresh token to the user

	// Remove sensitive info like password and refreshToken while sending response back
	const userData = user.toObject();
	delete userData.password;
	delete userData.refreshToken;

	res.status(201).json({
		message: "User registered successfully",
		user: userData,
		refreshToken,
	});
});

// Login user
const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            throw new Error("All fields are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email");
        }

        if (user.username !== username) {
            throw new Error("Invalid username");
        }

        const isPasswordCorrect = await user.checkPassword(password);
        if (!isPasswordCorrect) {
            throw new Error("Wrong password");
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

        res.status(200)
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .cookie("accessToken", accessToken, { httpOnly: true })
            .json({
                message: "User logged in successfully",
                user: user.toObject(),
                accessToken,
                refreshToken,
            });
    } catch (err) {
        next(err); // Pass errors to the error handler
    }
});


export { registerUser, loginUser };

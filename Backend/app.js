import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routers/userRouter.js";
import errorHandler  from "./utils/ApiError.js";

const app = express({
	origin: "*",
	credentials: true,
});

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", userRouter);

app.use(errorHandler);
export { app };

import {Router} from 'express'
import {loginUser, registerUser} from "../controller/auth.controller.js"

const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)

export {userRouter}
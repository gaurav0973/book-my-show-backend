import { Router } from "express"
import { getUser, loginUser, logoutUser, refreshUser, registerUser } from "./auth.controller"


const authRouter = Router()

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.post("/refresh-token", refreshUser)
authRouter.post("/logout", logoutUser)
authRouter.get("/me", getUser)


export default authRouter
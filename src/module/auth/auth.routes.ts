import { Router } from "express"
import { getUser, loginUser, logoutUser, refreshUser, registerUser } from "./auth.controller"
import { validateRequest } from "@/shared/middleware/request.middleware"
import { LoginSchema, RegisterSchema } from "./auth.model"


const authRouter = Router()

authRouter.post("/register",validateRequest(RegisterSchema), registerUser)
authRouter.post("/login", validateRequest(LoginSchema), loginUser)
authRouter.post("/refresh-token", refreshUser)
authRouter.post("/logout", logoutUser)
authRouter.get("/me", getUser)


export default authRouter
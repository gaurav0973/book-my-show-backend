import type { Request, Response } from "express";
import { loginService, registerService } from "./auth.service";
import ApiResponse from "@/shared/api-responce/api-responce";

export const registerUser = async (req:Request, res:Response)=>{
    // req.body => properly validate hoke aai hai 
    const user = await registerService(req.body)
    return ApiResponse.created(res, "User registered successfully", user)

} 
export const loginUser = async (req:Request, res:Response)=>{
    // req.body => validate hoke aai hai
    const { user, accessToken, refreshToken } = await loginService(req.body)
    
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    return ApiResponse.ok(res, "User logged in successfully", { user, accessToken })
} 
export const refreshUser = async (req:Request, res:Response)=>{
    const token = req.cookies?.refreshToken;
    
} 
export const logoutUser = async (req:Request, res:Response)=>{

} 
export const getUser = async (req:Request, res:Response)=>{

} 
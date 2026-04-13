import type { Request, Response } from "express";
import { registerService } from "./auth.service";
import ApiResponse from "@/shared/api-responce/api-responce";

export const registerUser = async (req:Request, res:Response)=>{
    // req.body => properly validate hoke aai hai 
    const user = await registerService(req.body)
    return ApiResponse.created(res, "User registered successfully", user)

} 
export const loginUser = async (req:Request, res:Response)=>{

} 
export const refreshUser = async (req:Request, res:Response)=>{

} 
export const logoutUser = async (req:Request, res:Response)=>{

} 
export const getUser = async (req:Request, res:Response)=>{

} 
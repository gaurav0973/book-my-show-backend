import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

// password hashing
export const generateHashedToken = async(textPassword: string) => {
    return await bcrypt.hash(textPassword, 10)
}
export const verifyPasswordToken = async(token: string, textPassword: string) => {
    return await bcrypt.compare(textPassword, token)
}


// JWT token for authentication and authorization
export const generateAccessToken = (payload: any)=>{
    return jwt.sign(payload, process.env.JWT_ACCESS_KEY_SECRET!, {expiresIn:"15m"})
}
export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_ACCESS_KEY_SECRET!)
}
export const generateRefreshToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_KEY_SECRET!, { expiresIn: "1d" })
}
export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_KEY_SECRET!)
}
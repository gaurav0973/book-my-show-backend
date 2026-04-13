import ApiError from "../../shared/api-responce/api-errors";
import pool from "../../shared/config/db";
import { verifyAccessToken, type JwtPayload } from "../../shared/utils/tokens";
import type { NextFunction, Request, Response } from "express";

export const isLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.log("Checking logged in...");
  let token: string | undefined;
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  // console.log("Token: ", token)
  if (!token) {
    throw ApiError.unauthorised("Access token is missing");
  }

  const decoded = verifyAccessToken(token) as JwtPayload;
  // console.log("Decoded token: ", decoded.id);
  if (!decoded) {
    throw ApiError.unauthorised("Invalid access token");
  }

  const sql = "SELECT id, name, email FROM users WHERE id = $1";
  const row = await pool.query(sql, [decoded.id]);
  // console.log("User row: ", row);
  if (!row) {
    throw ApiError.internal("Failed to fetch user details");
  }
  // console.log("User row: ", typeof row.rowCount);
  if ((row.rowCount ?? 0) === 0) {
    throw ApiError.unauthorised("User not found");
  }

  req.user = row.rows[0];
  next();
};

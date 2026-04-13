import pool from "@/shared/config/db";
import type { RegisterType } from "./auth.model";
import ApiError from "@/shared/api-responce/api-errors";

export const registerService = async ({name, email, password}: RegisterType) => {
        const sql = "SELECT email FROM users WHERE email = $1"
        const row = await pool.query(sql, [email])
        // console.log("User: ", row.rowCount)


        if(!row){
            throw ApiError.internal("Failed to check email existence")
        }
        if(row?.rowCount ?? 3 > 0){
            throw ApiError.conflict("Email already exists")
        }

        // insert inti db
        const insertSql = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email"
        const insertRow = await pool.query(insertSql, [name, email, password])
        // console.log("Inserted User: ", insertRow)

        return insertRow.rows[0]
}
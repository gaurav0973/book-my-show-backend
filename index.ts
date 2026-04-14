import app from "./src/app";
import pool from "./src/shared/config/db";

const PORT = process.env.PORT!

async function startServer(){
    await pool.connect()
    console.log("Connected to the database successfully")
    app.listen(PORT, ()=>{
        console.log("Server is running at : ", PORT)
    })
}

startServer().catch((err)=>{
    console.error("Failed to start server: ", err)
    process.exit(1)
})
import express from "express"
import authRouter from "./module/auth/auth.routes"
import ticketRouter from "./module/ticket-booking/ticket.routes"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/auth/", authRouter)
app.use("/api/ticket-booking/", ticketRouter)


export default app
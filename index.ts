import app from "@/app"

const PORT = process.env.PORT!

async function startServer(){
    app.listen(PORT, ()=>{
        console.log("Server is running at : ", PORT)
    })
}

startServer()
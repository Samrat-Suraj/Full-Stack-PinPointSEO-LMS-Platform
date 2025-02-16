import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { MongoDb } from "./config/MongoDb.js"
import UserRouter from "./router/user.router.js"
import CourseRouter from "./router/course.router.js"
import PurchaseRouter from "./router/purchase.router.js"
import CourseProgressRouter from "./router/course.progress.router.js"
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))
app.use(express.urlencoded({extended : true}))
app.use("/api/v1/user", UserRouter)
app.use("/api/v1/course", CourseRouter)
app.use("/api/v1/purchase", PurchaseRouter)
app.use("/api/v1/progress", CourseProgressRouter)

const PORT = 5000
app.listen(PORT , ()=>{
    MongoDb()
    console.log("Server Listing On Port" , 5000)
})
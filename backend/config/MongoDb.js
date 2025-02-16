import mongoose from "mongoose";
import { EnvVars } from "./EnvVars.js";

export const MongoDb = async () =>{
    try {
        const conn = await mongoose.connect(EnvVars.MONGO_URL)
        console.log("MongoDb Connected On" , conn.connection.host)
    } catch (error) {
        console.log("Error In MongoDb Connection" , error.message)
        process.exit(1)
    }
}
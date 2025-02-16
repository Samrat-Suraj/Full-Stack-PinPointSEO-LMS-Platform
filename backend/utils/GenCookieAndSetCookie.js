import jwt from "jsonwebtoken"
import { EnvVars } from "../config/EnvVars.js"

const GenCookieAndSetCookie = (userId , res) =>{
    const token = jwt.sign({userId} , EnvVars.JWT_SECRET , {expiresIn : "15d"})
    res.cookie("lmstoken" , token , {
        maxAge : 15 * 24 * 60 * 60 * 1000,
        sameSite : "strict",
        httpOnly : true
    })
    return token
}


export default GenCookieAndSetCookie
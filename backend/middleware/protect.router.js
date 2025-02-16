import jwt from "jsonwebtoken"
import { EnvVars } from "../config/EnvVars.js"
import User from "../model/user.model.js"

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["lmstoken"]
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided. Please login to access this resource."
            })
        }

        const decoded = jwt.verify(token, EnvVars.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again."
            })
        }

        const user = await User.findById(decoded.userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found. Please log in again." })
        }

        req.user = user
        next()

    } catch (error) {
        console.log("Error in protectRoute Middleware:", error.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Please try again later."
        })
    }
}


export default protectRoute
import {v2 as cloudinary} from "cloudinary"
import { EnvVars } from "./EnvVars.js"

cloudinary.config({
    cloud_name : EnvVars.CLOUDINARY_NAME,
    api_key : EnvVars.CLOUDINARY_API_KEY,
    api_secret : EnvVars.CLOUDINARY_API_SECRET,
})

export default cloudinary
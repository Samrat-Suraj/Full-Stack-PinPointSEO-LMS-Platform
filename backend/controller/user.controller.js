import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import GenCookieAndSetCookie from "../utils/GenCookieAndSetCookie.js";
import cloudinary from "../config/cloudinary.js";
import DataUri from "../utils/DataUri.js";

export const RegisterUser = async (req, res) => {
    try {
        const { firstName, lastName, email, contactNumber, password } = req.body
        if (!firstName || !lastName || !email || !contactNumber || !password) {
            return res.status(401).json({ success: false, message: "All Fields Are Required" })
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Please Enter Vaild Email Address" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters." })
        }

        const isUserAlreadyRegister = await User.findOne({ email: email });
        if (isUserAlreadyRegister) {
            return res.status(400).json({
                success: false,
                message: "This email is already registered. Please try different email address."
            });
        }


        const salt = await bcrypt.genSalt(10)
        const hassedPasword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hassedPasword,
        })
        GenCookieAndSetCookie(newUser._id, res)
        await newUser.save()
        return res.status(201).json({
            success: true, message: "Account Created Succssfully", user: {
                ...newUser._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log("Error In Register User Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({ success: false, message: "All Fields Are Required" })
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Please Enter Vaild Email Address" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters." })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Register Please Create Account" })
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({ success: false, message: "Incorrect Password." });
        }

        GenCookieAndSetCookie(user._id, res)
        return res.status(200).json({ success: true
            ,message: `Welcome back ${user?.firstName} To Our Platfrom`, user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log("Error In Login User Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const LogOutUser = async (req, res) => {
    try {
        res.clearCookie("lmstoken", "", { maxAge: 0 })
        return res.status(200).json({ success: true, message: "User Logout Successfully" })
    } catch (error) {
        console.log("Error In LogOut User Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const GetUserProfile = async (req, res) => {
    try {
        const userId = req.user
        const user = await User.findById(userId).populate("enrollCourse")
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found. Please log in again." })
        }

        return res.status(200).json({
            success: true, user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log("Error In GetUserProfile Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const UpdateUser = async (req, res) => {
    try {
        const userId = req.user
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found. Please log in again." })
        }

        const { firstName, lastName, email, contactNumber, password, state, city } = req.body
        const profilePic = req.file


        // if (email) {
        //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //     if (!emailRegex.test(email)) {
        //         return res.status(400).json({ success: false, message: "Please Enter Vaild Email Address" })
        //     }
        // }

        // if(password){
        //     if (password.length < 6) {
        //         return res.status(400).json({ success: false, message: "Password must be at least 6 characters." })
        //     }
        // }

        // const isEmalAlredyRegister = await User.findOne({ email: email });
        // if (isEmalAlredyRegister) {
        //     return res.status(400).json({ success: false, message: "This email is already registered. Please try different email address." });
        // }

        // if(password){
        //     const salt = await bcrypt.genSalt(10)
        //     const hashPassword = await bcrypt.hash(password, salt)
        //     user.password = hashPassword || user.password
        // }

        if (profilePic) {
            if (user.profilePic) {
                const oldPublicId = user.profilePic.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(oldPublicId)
            }
            const file = DataUri(profilePic)
            const uploadResponse = await cloudinary.uploader.upload(file)
            user.profilePic = uploadResponse.secure_url
        }

        user.firstName = firstName || user.firstName
        user.lastName = lastName || user.lastName
        user.contactNumber = contactNumber || user.contactNumber
        // user.email = email || user.email
        user.state = state || user.state
        user.city = city || user.city
        await user.save()
        return res.status(200).json({ success: true, message: "Profile Updated SuccessFully", user })

    } catch (error) {
        console.log("Error In Update User Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
} 
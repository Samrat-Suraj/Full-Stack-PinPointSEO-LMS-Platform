import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String },
    password: { type: String, required: true },
    state: { type: String },
    city: { type: String },
    enrollCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    role: { type: String, enum: ["student", "instructor"], default: "student" },
    profilePic: { type: String, default: "" }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User
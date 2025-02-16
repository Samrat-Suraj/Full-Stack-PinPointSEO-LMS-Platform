import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    coursePrice: { type: Number },
    subTitle: { type: String },
    category: { type: String },
    courseLevel: { type: String, enum: ["beginner", "intermediate", "advanced"] },
    courseThumbnail: { type: String, default: "" },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    enrolledStudent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isPubliced: { type: Boolean, default: false },
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema)
export default Course
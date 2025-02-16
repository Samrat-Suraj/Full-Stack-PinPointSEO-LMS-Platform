import mongoose from "mongoose";

const lectureProgressSchema = new mongoose.Schema({
    lectureId: { type: String },
    viewed: { type: Boolean, default: false },
}, { timestamps: true })

const courseProgressSchema = new mongoose.Schema({
    userId: { type: String },
    courseId: { type: String },
    completed: { type: Boolean, default: false },
    lectureProgress: [lectureProgressSchema]
}, { timestamps: true })

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema)
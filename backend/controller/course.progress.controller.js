import Course from "../model/course.model.js";
import { CourseProgress } from "../model/course.progress.model.js";

// Get course progress
export const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user;

        // Fetch the course details
        const courseDetails = await Course.findById(courseId).populate("lectures");
        if (!courseDetails) {
            return res.status(404).json({ success: false, message: "Course Not Found" });
        }

        // Fetch the user's progress for the course
        let courseProgress = await CourseProgress.findOne({ courseId, userId }).populate("courseId");

        // If no progress found, return course details with empty progress
        if (!courseProgress) {
            return res.status(200).json({
                data: {
                    courseDetails,
                    progress: [],
                    completed: false,
                },
            });
        }

        return res.status(200).json({
            data: {
                courseDetails,
                progress: courseProgress.lectureProgress,
                completed: courseProgress.completed,
            },
        });
    } catch (error) {
        console.error("Error in getCourseProgress:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Update lecture progress
export const updateLectureProgress = async (req, res) => {
    try {
        const { courseId, lectureId } = req.params;
        const userId = req.user;

        // Find or create a course progress document
        let courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgress) {
            courseProgress = new CourseProgress({ userId, courseId, completed: false, lectureProgress: [] });
        }

        // Find the lecture and mark it as viewed
        const lectureIdx = courseProgress.lectureProgress.findIndex((lecture) => lecture.lectureId === lectureId);
        if (lectureIdx !== -1) {
            courseProgress.lectureProgress[lectureIdx].viewed = true;
        } else {
            courseProgress.lectureProgress.push({ lectureId, viewed: true });
        }

        // Check if all lectures are viewed and update completion status
        const viewedLectures = courseProgress.lectureProgress.filter((lecture) => lecture.viewed).length;
        const course = await Course.findById(courseId);
        if (course.lectures.length === viewedLectures) {
            courseProgress.completed = true;
        }

        await courseProgress.save();
        return res.status(200).json({ success: true, message: "Lecture Progress Updated Successfully" });
    } catch (error) {
        console.error("Error in updateLectureProgress:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Mark course as completed
export const markAsCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user;

        // Find the course progress
        let courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgress) {
            return res.status(404).json({ success: false, message: 'Course Progress Not Found' });
        }

        // Mark all lectures as viewed and set progress as true
        courseProgress.lectureProgress.forEach((lectureProgress) => lectureProgress.viewed = true);
        courseProgress.completed = true;

        await courseProgress.save();
        return res.status(200).json({ success: true, message: "Course Marked as Completed" });
    } catch (error) {
        console.error("Error in markAsCompleted:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Mark course as not completed (reset progress)
export const markAsUnCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user;

        // Find the course progress
        let courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgress) {
            return res.status(404).json({ success: false, message: 'Course Progress Not Found' });
        }

        // Reset lecture progress and set completion status to false
        courseProgress.lectureProgress.forEach((lectureProgress) => lectureProgress.viewed = false);
        courseProgress.completed = false;

        await courseProgress.save();
        return res.status(200).json({ success: true, message: "Course Marked as Incompleted" });
    } catch (error) {
        console.error("Error in markAsUnCompleted:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

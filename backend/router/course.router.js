import express from "express"
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, MediaUpload, removeLecture, searchCourse, togglePublishCourse } from "../controller/course.controller.js";
import protectRoute from "../middleware/protect.router.js";
import upload from "../utils/Multer.js";
const router = express.Router()

router.post("/", protectRoute, createCourse);
router.get("/", protectRoute, getCreatorCourses);
router.put("/:courseId", protectRoute, upload.single("courseThumbnail"), editCourse);
router.get("/:courseId", protectRoute, getCourseById);
router.get("/search", protectRoute, searchCourse);
router.get("/published-courses/all", getPublishedCourse);
router.post("/:courseId/lecture", protectRoute, createLecture);
router.get("/:courseId/lecture", protectRoute, getCourseLecture);

router.post("/:courseId/lecture/:lectureId", protectRoute , upload.single("videoUrl"), MediaUpload);
router.post("/:courseId/lecture/:lectureId/edit", protectRoute, editLecture);

router.delete("/:courseId/lecture/:lectureId/delete", protectRoute, removeLecture);
router.get("/lecture/:lectureId", protectRoute, getLectureById);
router.patch("/:courseId", protectRoute, togglePublishCourse);

export default router
import express from 'express';
import { getCourseProgress, markAsCompleted, markAsUnCompleted, updateLectureProgress } from '../controller/course.progress.controller.js';

const router = express.Router();

router.get('/:courseId', getCourseProgress);
router.put('/:courseId/lecture/:lectureId/view', updateLectureProgress);
router.put('/:courseId/complete', markAsCompleted);
router.put('/:courseId/incomplete', markAsUnCompleted);

export default router;

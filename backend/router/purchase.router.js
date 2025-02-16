import express from "express"
import protectRoute from "../middleware/protect.router.js"
import { createCheckOutSession, getAllPurchesCourse, GetCourseDetailsWithPurchaseStatus, stripeWebhook } from "../controller/purchase.controller.js"
const router = express.Router()

router.post("/checkout/create-checkout-session", protectRoute, createCheckOutSession)
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook)
router.get("/course/:courseId/detail-with-status", protectRoute, GetCourseDetailsWithPurchaseStatus)
router.get("/", getAllPurchesCourse)

export default router
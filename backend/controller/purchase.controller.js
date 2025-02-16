import Stripe from "stripe"
import { EnvVars } from "../config/EnvVars.js"
import Course from "../model/course.model.js";
import User from "../model/user.model.js";
import Purchase from "../model/purchase.model.js";
import Leacture from "../model/lecture.model.js";

const stripe = new Stripe(EnvVars.STRIP_SECRET_KEY)

export const createCheckOutSession = async (req, res) => {
    try {
        const userId = req.user;
        const { courseId } = req.body;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Found" })
        }

        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({ success: false, message: "Course Not Found" })
        }

        const newPurchase = new Purchase({
            courseId: course._id,
            userId: user._id,
            amount: course.coursePrice,
            status: "pending",
        })

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: course.title,
                            images: [course.courseThumbnail],
                        },
                        unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",

            success_url: `http://localhost:3000/course-details/${courseId}`, // once payment successful redirect to course progress page
            cancel_url: `http://localhost:3000/course-details/${courseId}`,
            metadata: {
                courseId: course._id.toString(),
                userId: user._id.toString(),
            },
            shipping_address_collection: {
                allowed_countries: ["IN"],
            },
        });

        if (!session.url) {
            return res.status(400).json({ success: false, message: "Error while creating session" });
        }

        // Save the purchase record
        newPurchase.paymentId = session.id;
        await newPurchase.save()
        return res.status(200).json({ success: true, url: session.url });

    } catch (error) {
        console.log("Error In createCheckOutSession Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const stripeWebhook = async (req, res) => {
    let event;
    try {
        const payloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });

        event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error) {
        console.error("Webhook error:", error.message);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
        console.log("checkout.session.completed is called");

        try {
            const session = event.data.object;

            // Find the purchase based on session.id
            const purchase = await Purchase.findOne({ paymentId: session.id }).populate({ path: "courseId" });

            if (!purchase) {
                return res.status(404).json({ message: "Purchase not found" });
            }

            // Update purchase amount
            if (session.amount_total) {
                purchase.amount = session.amount_total / 100;
            }

            purchase.status = "completed";

            // Make all lectures visible by setting `isPreviewFree` to true
            if (purchase.courseId && purchase.courseId.lectures.length > 0) {
                await Leacture.updateMany(
                    { _id: { $in: purchase.courseId.lectures } },
                    { $set: { isPreviewFree: true } }
                );
            }

            // Save the updated purchase
            await purchase.save();

            // Add course to the user's enrolledCourses
            await User.findByIdAndUpdate(
                purchase.userId,
                { $addToSet: { enrollCourse: purchase.courseId._id } }, // Add course ID to enrolledCourses
                { new: true }
            );

            // Add user to the enrolledStudents of the course
            await Course.findByIdAndUpdate(
                purchase.courseId._id,
                { $addToSet: { enrolledStudent: purchase.userId } }, // Add user ID to enrolledStudents
                { new: true }
            );
        } catch (error) {
            console.error("Error handling event:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // Send a success response
    res.status(200).send();
};



export const GetCourseDetailsWithPurchaseStatus = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user;

        const course = await Course.findById(courseId).populate({ path: "creator" }).populate({ path: "lectures" });
        if (!course) {
            return res.status(400).json({ success: false, message: "Course Not Found" });
        }
        const purchased = await Purchase.findOne({ userId, courseId });
        return res.status(200).json({
            success: true,
            course,
            purchased: !!purchased
        });

    } catch (error) {
        console.log("Error in GetCourseDetailsWithPurchaseStatus Controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const getAllPurchesCourse = async (req, res) => {
    try {
        const purchaseCourse = await Purchase.find({ status: "completed" }).populate({ path: "courseId" });
        if (!purchaseCourse) {
            return res.status(404).json({ purchaseCourse: [] })
        }
        return res.status(200).json({ success: true, purchaseCourse })
    } catch (error) {
        console.log("Error In getAllPurchesCourse Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
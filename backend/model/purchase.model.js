import mongoose from "mongoose"

const purchaseSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true , default : 1 },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    paymentId: { type: String, required: true }
}, { timestamps: true })

const Purchase = mongoose.model("Purchase", purchaseSchema)
export default Purchase
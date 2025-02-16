import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    leactureTitle : {type : String , required : true},
    videoUrl : {type : String},
    publicId : {type : String},
    isPreviewFree : {type : Boolean},
},{timestamps : true})

const Leacture = mongoose.model("Lecture" , lectureSchema)
export default Leacture
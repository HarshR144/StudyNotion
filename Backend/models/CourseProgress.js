const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"Course",
    },
    completedVideos:[{
        type:mongoose.Types.ObjectId,
        ref:"Subsection",
    }]
})
module.exports = mongoose.model("CourseProgress",courseProgressSchema)
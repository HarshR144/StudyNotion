const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title:{
        type:String,
        // trim:true,

    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String,

    },
    videoUrl:{
        type:String,
        
    }
});

module.exports = mongoose.model("SubSection",subSectionSchema);
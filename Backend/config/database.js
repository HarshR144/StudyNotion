const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDb = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(console.log("DB connected successfully"))
    .catch((error)=>{
        console.log("DB connection Failed");
        console.error(error);
        process.exit(1);
    })
};
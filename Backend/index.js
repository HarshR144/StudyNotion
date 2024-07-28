const express = require("express");
const cookieParser = require("cookie-parser");
const cors =require("cors");
require("dotenv").config();
const {connectDb} = require("./config/database");
const app = express();
const fileUpload = require("express-fileupload");
const {cloudinaryConnect} = require("./config/cloudinary");


//import routes
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const contactUsRoutes = require("./routes/contactUs");
const courseRoutes = require("./routes/course");
const paymentRoutes =require("./routes/payment")

const PORT = process.env.PORT ||5000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
        maxAge:14400
    })
)
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

connectDb();
cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/contactus",contactUsRoutes);
app.use("/api/v1/payment",paymentRoutes);

// def route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up  and running"
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
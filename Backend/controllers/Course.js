const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadFileToCloudinary} = require("../utils/fileUploader");
require("dotenv").config();


//create course
exports.createCourse =async (req,res)=>{
    try{
        //fetch data
        const {courseName,courseDescription, whatYouWillLearn,price,category} = req.body;
        const thumbnail = req.files.thumbnailImage;

        //validate
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        //check/ fetch instructor details
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ", instructorDetails);
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found',
            });
        }
        //check if tag is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:'Tag Details not found',
            });
        }


        //upload image to cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail,process.env.FOLDER_NAME)
        
        //create entry for new course
        const newCourse = await Course.create({
            courseName:courseName,
            courseDescription:courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price:price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        //update User(Instructor) Courses data
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id
                }
            },
            {new:true}
            )
        //update Category Courses data
        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:'Course created successfully',
            data:newCourse
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllCourses

exports.showAllCourses = async (req,res)=>{
    try{
        //fetch all courses from db
        const allCourses = await Course.find({},
            {courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            StudentsEnrolled:true,
            whatYouWillLearn:true,

            }).populate("instructor").exec();
            
            return res.status(200).json({
                success:true,
                message:'All courses returned successfully',
                data:allCourses,
            })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Cannot fetch course data",
            error:error.message,
        })
    }
}
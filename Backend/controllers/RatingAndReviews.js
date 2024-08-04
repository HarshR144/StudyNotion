const RatingAndReview = require("../models/RatingAndReview");
const Course  = require("../models/Course");
const { default: mongoose } = require("mongoose");


//create rating and review
exports.createRating = async (req,res)=>{
    try{
        //fetch data(rating and review and courseId and userId)
        const userId = req.user.id;
        const {rating, review, courseId} = req.body; 
        console.log({userId,courseId});
        //validate
        //check if user is enrolled or not
        const courseDetails = await Course.find({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } },
          })  // if(!courseDetails.studentsEnrolled.includes()) ;
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        } 
        //check if already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({user:userId,
                                                                course:courseId});
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user"
            })
        }                                                         
        //create rating review and insert into DB
        const newRatingAndReview = await RatingAndReview.create({
                                                                rating,
                                                                review,
                                                                user:userId,
                                                                course:courseId
        })

        //update course with this rating review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                        {
                                            $push:{
                                                ratingAndReviews: newRatingAndReview._id,
                                            }
                                        });
        console.log(updatedCourseDetails);
        //return res
        return res.status(200).json({
            success:true,
            message:"Rating and Review created successfully",
            newRatingAndReview,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,  
        })
    }
}

//get average rating
exports.getAverageRating = async (req,res)=>{
    try{
        //get course Id
        const courseId = req.body.courseId;

        //calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{course: new mongoose.Types.ObjectId(courseId)}
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg: "$rating"},
                }
            }
        ])
        console.log(result); 
        //return rating
        if(result > 0){
            return res.status(200).json({
                success:true,
                message:"Rating average returned successfully",
                averageRating:result[0].averageRating,
            })
        }
        //if no rating review exists
        return res.status(200).json({
            success:true,
            message:"Average Rating returned successfully",
            averageRating:0,
        })
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,  
        })
    }
}

//get all rating and reviews
exports.getAllRating= async (req,res) =>{
    try{
        const allRatingAndReviews = await RatingAndReview.find({}).sort({rating:"desc"})
        .populate([
            {
                path:"user",
                select:"firstName lastName email image",
            }
        ]).populate(
            {
            path:"course",
            select:"courseName"
            }
        ).exec();
        return res.status(200).json({
            success:true,
            message:"All rating and reviews fetched successfully",
            data:allRatingAndReviews,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,  
        })
    }
}
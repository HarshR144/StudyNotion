const Category = require("../models/Category");
const Course = require("../models/Course");

//create Category handler
exports.createCategory = async(req,res)=>{
    try{
        //fetch data
        const {name, description} = req.body;

        //validation
        if(!name){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        //create entry in DB
        const newCategory = await Category.create({name:name, description:description});
        console.log(newCategory);

        //return response
        return res.status(200).json({
            success:true,
            message:'Category created successfully',
            data:newCategory
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllCategories
exports.showAllCategories = async (req,res)=>{
    try{
        const allCategories = await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:'All categories returned successfully',
            data:allCategories,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//Category page details
exports.categoryPageDetails = async (req,res)=>{
    try{
        //get category Id
        const {categoryId} = req.body;

        //get all courses corresponding to categoryId
        const selectedCategory = await Category.findById(categoryId)
                                                        .populate("courses")
                                                        .exec();

        //validation
        if(!selectedCategory){
            console.log("category not found");
            return res.status(404).json({
                success:false,
                message:'Category not found',
            })
        }
        if(selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}
        console.log(selectedCategory);

        //get courses for different category
        const differentCategories = await Category.find({
            _id:{$ne:categoryId},
        }).populate("courses").exec();

        //get top 10 selling courses
        const allCategories = await Course.find({});
        const topCourses = allCategories.courses.sort((a,b)=>b.enrolledStudents.length -a.enrolledStudents.length).slice(0,10);
        //return response
        return res.status(200).json({
            success:true,
            message:'Category Page details returned successfully',
            data:{
                selectedCategory,
                differentCategories,
                topCourses,
            },
        })
    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
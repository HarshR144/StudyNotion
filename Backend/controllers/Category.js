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


exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
  
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
     
      const differentCategory = await Category.find({
        _id:{$ne:categoryId},
    }).populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      console.log()
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
  
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
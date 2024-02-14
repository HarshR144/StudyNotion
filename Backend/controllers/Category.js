const Category = require("../models/Category");


//create Category handler
exports.createCategory = async(req,res)=>{
    try{
        //fetch data
        const {name, description} = req.body;

        //validation
        if(!name || !description){
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
            allCategories,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

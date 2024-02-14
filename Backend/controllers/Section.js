const Section = require("../models/Section");
const Course = require("../models/Course");


exports.createSection = async (req,res)=>{
    try{
        //fetch data
        const {sectionName,courseId} = req.body;
      
        //validate
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }

        //insert section in db
        const newSection = await Section.create({sectionName});
        
        //update course with new section id
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                                                {$push:{courseContent:newSection._id}},
                                                                {new:true})
        .populate([
            {
                path:'Section',
                populate:[{path:'SubSection'}]
            }
        ]).exec();
        //populate section and subsection both in updatedCourseDetails      
        console.log(updatedCourseDetails);
        
        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updatedCourseDetails,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create Section",
            error:error.message,
        })
    }
}


exports.updateSection = async (req,res)=>{
    try{
        //data input
        const {sectionName,sectionId} = req.body;
        //validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            })
        }
        //update
        const updatedSection  = await Section.findByIdAndUpdate(sectionId,
            {sectionName},
            {new:true}) 
        //return response
        return res.status(200).json({
            success:true,
            message:'Section updated successfully',
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.deleteSection = async(req,res)=>{
    try{
        //fetch section id (sending id in params)
        const {sectionId} = req.params;
        //validate
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            })
        }       
        //delete
        await Section.findByIdAndDelete(sectionId);

        //TODO delete the section reference  from course and delete all subsection of this section 
        //response
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section",
            error:error.message,
        })
    }
}
const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");


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
                                                                {new:true}).populate(
            [{
                path:'courseContent',
                populate:[{path:'subSection'}]
            }]
        ).exec();
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

// update section name
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
        const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section",
            error:error.message,
        })
    }
}
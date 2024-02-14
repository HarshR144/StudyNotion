const SubSection = require("../models/SubSection");
const Section = require("../models//Section");
const {uploadFileToCloudinary} = require("../utils/fileUploader");
require("dotenv").config();



//create Subsection
exports.createSubSection = async (req,res) =>{
    try{
        //fetch data
        const {title,timeDuration,description,sectionId} = req.body;

        //extract video / file
        const video = req.files.videoFile;

        //validate
        if(!title || !timeDuration || !description || !sectionId){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        //upload video /file to cloudinary
        const uploadDetails  = await uploadFileToCloudinary(video,process.env.FOLDER_NAME)
        //create subsection in db
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        
        //update section with newly created subsection id
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
            {
                $push:{
                    subSection:subSectionDetails._id,
                }
            },
            {new:true}).populate("subSection").exec();
        //return res
        return res.status(200).json({
            success:true,
            message:'subSection created successfully',
            updatedSection,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create subSection",
            error:error.message,
        })
    }
}

exports.updateSubSection = async (req,res)=>{
    try{
        //fetch data
        const {subSectionId,title,description,timeDuration,videoUrl} = req.body;

        //validate
        if(!title || !timeDuration || !description || !subSectionId || !videoUrl){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }

        //if video is to be updated
        const video = req.files.videoFile
        if(video){
             //upload video /file to cloudinary
            const uploadDetails  = await uploadFileToCloudinary(video,process.env.FOLDER_NAME)
            videoUrl = uploadDetails.secure_url;
        }

        //update subsection
        const updatedSubsectionDetails = await SubSection.findByIdAndUpdate(subSectionId,
            {
                title:title,
                description:description,
                timeDuration:timeDuration,
                videoUrl:videoUrl,
            },
            {new:true});
        //return res
        return res.status(200).json({
            success:true,
            message:'subSection updated successfully',
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update subSection",
            error:error.message,
        })
    }
}

exports.deleteSubSection = async(req,res)=>{
    try{
        //fetch section id (sending id in params)
        const {subSectionId} = req.params;
        //validate
        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            })
        }       
        //delete
        await SubSection.findByIdAndDelete(subSectionId);

        //TODO delete the subsection reference  from section 
        //response
        return res.status(200).json({
            success:true,
            message:'subSection deleted successfully',
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete subSection",
            error:error.message,
        })
    }
}
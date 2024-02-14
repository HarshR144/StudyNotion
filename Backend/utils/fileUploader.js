const cloudinary = require("cloudinary").v2;

exports.uploadFileToCloudinary = async(file,folderName, height, quality)=>{
    //create options
    const options = {folder};
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto"; //automatically determines type of resource (img,video,etc)

    //upload to cloudinary
    return await cloudinary.uploader.upload(file.tempFilePath,options)
     
}
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async(req,res)=>{
  try{
    //fetch data
    const  {dateofBirth="",about="",contactNumber,gender} = req.body;

    //get user id
    const userId = req.user.id;
    //validate
    if(!contactNumber || !gender || !userID ){
        return res.status(400).json({
            success:false,
            message:'All fields are required',
        })
    }

    //find profile 
    const userDetails = await User.findById(userId); 
    const profileId = userDetails.additionalDetails;
    const profileDetails =await profile.findById(profileId);
    //update profile
    profileDetails.dateofBirth = dateofBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    //return res
    return res.status(200).json({
        success:true,
        message:'Profile updated successfully',
        profileDetails,
    })
  }catch(error){
    return res.status(500).json({
        success:false,
        message:error.message,
    })
}   
}
//TODO schedule the delete account operation 
//cron job
//delete account
exports.deleteAccount = async (req,res)=>{
    try{
        //get user id
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'User not found',
            })
        }
        //delete additional details data
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //TODO delete users enrollment from courses and his rating reviews
        
        //delete user profile
        await User.findByIdAndDelete({_id:id});
         
        //return response
        return res.status(200).json({
            success:true,
            message:'User deleted successfully',
        })
    }catch(error){
    return res.status(500).json({
        success:false,
        message:error.message,
    })
}   
}

exports.getAllUserDetails = async(req,res)=>{
    try{
        //get uer id
        const id = req.user.id;
        // validation get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return res
        return res.status(200).json({
            success:true,
            message:'User data fetched successfully',
            user:userDetails,        

        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }   
}
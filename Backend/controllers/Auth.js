const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");


//sendOTP
exports.sendOTP = async (req,res)=>{
    try{
        // fetch email from req body
        const {email} = req.body;

        //check if user already exists for the provided email
        const checkUserPresent = await User.findOne({email});
        //if user exists then
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'User already registered',
            })
        }
        //else generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated: ",otp);
        //check if generated otp is unique
        let result = await OTP.findOne({otp: otp});
        while(result){
            otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
            });
            result = await OTP.findOne({otp: otp}); 
        }
        const otpPayload = {email,otp};
        //insert otp in db
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);
        //return success response
        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp,
        })

    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}


// Signup Controller for Registering USers


//sign up handler
exports.signUp= async(req,res)=>{
    try{
            //fect data from req body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
                } = req.body;
        //validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
                return res.status(403).json({
                    success:false,
                    message:"All fields are required"
                })
            }
        //check if user already exists match passwords
        if (password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password  and confirmPassword value do not match, please try again",
            });
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success:false,
                message:"User already registered. Please sign-in to continue",
            });
        };

        //find most recent otp from db
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        // console.log("Recent OTP: ",recentOtp);
        console.log("otp user:",otp,"opt db: ", recentOtp[0].otp);
        //validate otp
        if(recentOtp.length == 0){
            return res.status(400).json(
                {
                    success:false,
                    message:"Otp not valid"
                }
            )
        }
        
        else if (otp !==recentOtp[0].otp) {
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //entry create in db
        // create profile
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:contactNumber
        });
        const user =await User.create({
                firstName,
                lastName,
                email,
                password:hashedPassword,
                accountType,
                additionalDetails:profileDetails._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`, 
        });
        //return res
        res.status(200).json({
            success:true,
            message:"SignUp Successfull",
            user,
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered, try again",
        })
    }
}

//login handler

exports.login = async(req,res) =>{
   try{
     //fetch data from req body
     const {email,password}= req.body;

     //validation
     if(!email || !password){
        return res.status(403).json({
            success:false,
            message:"All fields  are required, please try again"
        })
     }
     //check if user exists
     const user = await User.findOne({email}).populate("additionalDetails");
     if(!user){
        return res.status(401).json({
            success:false,
            message:"User is not registered, please signup to Continue",
        });
    };
     //generate jwt after password match
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                // accountType:user.accountType,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            }) 
            user.token =token;
            user.password = undefined;
            //create cookie
            const options = {
                expires: new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully",
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect "
            })
        }
   }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Login failure, please try again",
        })
   }
    
}
//change password
exports.changePassword = async (req,res)=>{
    try{
        //fetch user data
        const userId = req.user.id;
        const userDetails = await User.findById(userId);

        //get data prev password ,new pass, confirmnew pass, email        
        const {oldPassword, newPassword, newConfirmPassword} = req.body;

        //validation
        if(!userId || !oldPassword || !newPassword || !newConfirmPassword){
            return res.status(403).json({
                success:false,
                message:"All fields  are required, please try again"
            })
        }
        //check if old password is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword,userDetails.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"Current password is incorrect",
            });
        }
        //if old password and new password are same
        if(oldPassword === newPassword){
			return res.status(400).json({
				success: false,
				message: "New Password cannot be same as Old Password",
			});
		}

        if (newPassword !== newConfirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password  and confirmPassword value does not match, please try again",
            });
        }
         //hash password
         const hashedPassword = await bcrypt.hash(newPassword, 10);

        //update password in db
        const updateResult = await User.findByIdAndUpdate({_id:userId},
            {password:hashedPassword},
            {new:true});
        
        //send password update mail
        try{
            const emailResponse = await mailSender(updateResult.email,
                            "User Password Updated",
                            passwordUpdated(
                                updateResult.email,
                                `Password updated successfully for  ${updateResult.firstName} ${updateResult.lastName}`
                            )
                            );
            console.log("Email sent Successfully:", emailResponse.response);
        }catch(error){console.error("Error occurred while sending email:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while sending email",
            error: error.message,
        });
    }
  
        // return response
        res.status(200).json({
            success:true,
            message:"Password updated Successfully",
        });

    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Password update failed, Something went wrong",
            error:error.message,
        })
    }
}
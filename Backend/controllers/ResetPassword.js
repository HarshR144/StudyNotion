const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
// Reset password token
exports.resetPasswordToken = async(req,res)=>{
    try{
        //get email from request body
        const email =req.body.email;
        
        //check if user exists and do validation
        const user = await User.findOne({email});
        if(!user){
            return res.status(403).json({
                success:false,
                message:"Your email address not registered,Please enter valid email address"
            })
        }
        
        //generate token
        const token = crypto.randomUUID();
        //update user by adding  token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email:email},
                                                            {
                                                                token:token,
                                                                resetPasswordExpires:Date.now()+5*60*1000,
                                                            },
                                                            {new:true});

        //create url (TOCHANGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE WHEN DEPLOYING)
        // const url = `http://localhost:3000/update-password/${token}`;
        const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}`

        //send mail containing url
        await mailSender(email,"Password Reset Link",`Password reset link: ${url}`);

        //return response
        return res.status(200).json({
            success:true,
            message:"Email sent successfully, please check  email and change password"
        })


    
    } catch (error) {
        return res.json({
          error: error.message,
          success: false,
          message: `Some Error in Sending the Reset Message`,
        })
      }
    }

//Reset password  (resets password in Db)
exports.resetPassword = async(req,res)=>{
    try{
        //fetch data
        const {password,confirmPassword, token} = req.body;

        //validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password  and confirmPassword value does not match, please try again",
            });
        }
        if(!password || !confirmPassword || !token){
            return res.status(403).json({
                success:false,
                message:"All fields  are required, please try again"
            })
        }

        // now you have to update password in user in DB but how will you find user ??? 
        // we will use the token this token is saved in user db which can be used to find user in db
        //get user details from db using token
        const userDetails = await User.findOne({token:token});
        
        //if no entry invalid token or token used 
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Token Invalid ",
            });
        }
        //token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success:false,
                message:"Token Expired, please regenerate your token",
            });
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        //update password
        await User.findOneAndUpdate({token:token},
            {password:hashedPassword},
            {new:true})
        //return response
        res.status(200).json({
            success:true,
            message:"Password reset Successfully",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reseting password",
        })
    }
}
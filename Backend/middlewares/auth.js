const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req,res,next)=>{
    try{
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer","");
        //if token missing return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(error){
            //verification
            return res.status(401).json({
                success:false,
                message:"token is invalid", 
            })
        }
         next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}
//isStudent
exports.isStudent = async (req,res,next)=>{
  try{
    if(req.user.role!=="Student"){
        return res.status(401).json({
            success:false,
            message:"This is a protected route for Students only"
        })
    }
  }catch(error){
    return res.status(500).json({
        success:false,
        message:"User role cannot be verified",
    })
  }

}
//isInstructor
exports.isInstructor = async (req,res,next)=>{
    try{
      if(req.user.role!=="Instructor"){
          return res.status(401).json({
              success:false,
              message:"This is a protected route for Instructor only"
          })
      }
    }catch(error){
      return res.status(500).json({
          success:false,
          message:"User role cannot be verified",
      })
    }
  
  }
//isAdmin
exports.isAdmin = async (req,res,next)=>{
    try{
      if(req.user.role!=="Admin"){
          return res.status(401).json({
              success:false,
              message:"This is a protected route for Admin only"
          })
      }
    }catch(error){
      return res.status(500).json({
          success:false,
          message:"User role cannot be verified",
      })
    }
  
  }
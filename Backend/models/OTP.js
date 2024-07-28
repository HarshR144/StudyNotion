const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")
const emailVerificationTemplate = require("../mail/templates/emailVerificationTemplate")
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,

    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*60,
    }
});

//function to 'send OTP mail'

async function sendVerificationEmail(email,otp){
    // Create a transporter to send emails

	// Define the email options

	// Send the email
    try{
        const mailResponse = await  mailSender(
                                        email,
                                        "Verification Email from StudyNotion",
                                        emailVerificationTemplate(otp)
                                         );
        console.log("Email send successfully: ", mailResponse);
    }catch(error){
        console.log(`error occured while sending mail:`, error);
        throw error;
    }
}

OTPSchema.pre("save",async function(next){
    console.log("New document saved to database");
    // Only send an email , after email is sent then only  new document is created saving the otp in database for verification at user end
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    
    }
    next();
})
//another method to export
// const OTP = mongoose.model("OTP", OTPSchema);

// module.exports = OTP;
module.exports = mongoose.model("OTP",OTPSchema);


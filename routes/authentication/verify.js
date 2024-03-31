const express = require('express');
const Otp = require('../../models/SchemaforOtp');
const router = express.Router();

router.post('/verify',async(req,res)=>{
    const {email,otp} = req.body;
    const verifyOTP = async(email,otp)=>{
        const findUser= await Otp.findOne({email});
        if(!findUser){
            //user not found
            console.log("user not found")
            return false;
        }
        if(findUser.otpExpiration < new Date()){
            //otp is expired
            console.log("OTP expired")
            return false;
        }
        return findUser.otp == otp;
    }
    const isValidOTP = await verifyOTP(email,otp);

    if(isValidOTP){
        const findUser= await Otp.findOne({email});
        findUser.otp = undefined;
        findUser.otpExpiration = undefined;
        await findUser.save();
        return res.status(200).json({message:"OtP Verified successfully"});
    }
    else{
        return res.status(400).json({message:"Failed to verify, Invalid Otp."});
    }
})

module.exports = router;
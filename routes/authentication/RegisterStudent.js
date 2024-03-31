const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const Otp = require('../../models/SchemaforOtp');


router.post('/regstudent',(req,res)=>{
    // email as input and send otp to that email and match them if worng show error else show dashboard

    const event="Student Registration"
    //get email from input destrucering email from req body
    const {email}= req.body;

    //here generarting an otp of length 6 numbers
    const genarateOtp=()=>{
        return Math.floor(Math.random()*900000)+100000;
    }
    const otp=genarateOtp();

    //send otp to mail given by user using nodemailer
    const transpoter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.APP_USER,
            pass:process.env.APP_PASSWORD
        }
    })
    
    const mailOptions = {
        from:process.env.APP_USER,
        to:`${email}`,
        subject:`Otp for ${event}`,
        html:`
        Your Otp is ${otp}.<br>
        <b>This Otp expire in 5 mins.</b>`
    }

    const saveOTP = async(email,otp)=>{
        const findUser = await Otp.findOne({email});
        if(findUser){
            return res.status(400).json({message:"User already Registered"})
        }
        else{
            const otpExpiration = new Date(Date.now()+ 5*60*1000);
            const newOtp= new Otp({
                email,
                otp,
                otpExpiration,
                isStudent:true
            })
            await newOtp.save();
        }
        return (findUser)?false:true;

    }

    try {
        if(saveOTP(email,otp)){
        transpoter.sendMail(mailOptions)
        .then(()=>{
            return res.status(200).json({message:"Otp sent Sucessfully"})
        })
        .catch((error)=>{
            return res.status(500).json({message:"Sending Otp Failed"});
            console.error(error)})
        }
    } catch (error) {
        console.error("Error in sending Otp mail",error);
    }

})
module.exports = router;
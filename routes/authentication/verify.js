const express = require('express');
const Otp = require('../../models/SchemaforOtp');
const router = express.Router();

router.post('/verify', async (req, res) => {
    const { email, otp} = req.body;
    // Convert isStudent to a boolean

    const verifyOTP = async (email, otp) => {
        const findUser = await Otp.findOne({email});
        if (!findUser) {
            return { isValid: false, message: "User not found" };
        }
        if (findUser.otpExpiration < new Date()) {
            return { isValid: false, message: "OTP expired" };
        }
        return { isValid: findUser.otp == otp, message:findUser.otp == otp?"OTP verified":"Invalid OTP"};
    }

    try {
        const { isValid, message } = await verifyOTP(email, otp);

        if (isValid) {
            const findUser = await Otp.findOne({ email });
            findUser.otp = undefined;
            findUser.otpExpiration = undefined;
            await findUser.save();
            return res.status(200).json({ message: "OTP Verified successfully" });
        } else {
            return res.status(400).json({ message: message });
        }
    } catch (error) {
        console.error("Error while verifying", error);
        return res.status(500).json({ message: "An error occurred while processing your request." });
    }
});


module.exports = router;
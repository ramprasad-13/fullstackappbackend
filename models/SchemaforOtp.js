const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    otp:{
        type: Number,
        required: false
    },
    otpExpiration:{
        type:Date,
        required: false
    },
    isStudent:{
        type:Boolean,
        required: true
    }
})


const Otp = mongoose.model('Otp',otpSchema)

module.exports = Otp;
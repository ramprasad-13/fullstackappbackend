const mongoose = require('mongoose');
require('dotenv').config()

//mongo uri
const uri=process.env.MONGO_URI;

//mongo db connection

const db = async()=>{
    try {
        await mongoose.connect(uri);
        console.log("DB Connection Established")
    } catch (error) {
        console.error("Error in connecting to DB",error)
    }
}

module.exports = db;
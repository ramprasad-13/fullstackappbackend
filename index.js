const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const hostname="0.0.0.0"
const port= process.env.PORT || 3000;
const db=require('./connection');

//connecting DB;
db();

//importing routes
const registerStudent = require('./routes/authentication/RegisterStudent');
const registerCompany = require('./routes/authentication/RegisterCompany');
const loginStudent = require('./routes/authentication/LoginStudent');
const loginCompany = require('./routes/authentication/LoginCompany');
const verify = require('./routes/authentication/verify')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.use(registerStudent);
app.use(registerCompany);
app.use(loginStudent);
app.use(loginCompany);
app.use(verify);


app.get('/',(req,res)=>{
    res.send("Application working");
})

app.listen(port,hostname,()=>{
    console.log("App started on port",port)
})
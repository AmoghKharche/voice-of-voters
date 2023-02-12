const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
require("../db/conn")
const User = require("../model/userSchema")
const jwt = require('jsonwebtoken');



router.post('./register', async (req,res)=>{

    const {name,email,voterid,number,address,password,cpassword} = req.body;
    
    if(!name || !email || !voterid || !number || !address || !password || !cpassword){
        return res.status(422).json({error: "Please Fill All the Details"})
    }

    try {

    const userExist = await User.findOne({email:email} && {voterid:voterid})

    if (userExist){
        return res.status(422).json({error: "User Already Registered"})
    }

    const user = new User({name,email,voterid,number,address,password,cpassword});


    
     await user.save();

     res.status(422).json({error: "User Already Registered"})

    }
    
    catch(err){
        console.log(err)};
});

//login route

router.post('/login', async (req,res) => {

    try{
        let token;
        const { email,password } = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Please Fill in valid details"})
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){

        const isMatch = await bcrypt.compare(password,userLogin.password)

            token = await userLogin.generateAuthToken();
            res.cookie("jwtoken", token,{
                expires: new Date(Date.now() + 2592000000),
                httpOnly:true
            })


        if(!isMatch){
            res.json({error: "Invalid Credentials"})
        }
        else{
        res.json({message:"User Logged in successfully"})
    }}
    else{
        res.json({error: "Invalid Credentials"})
    }
    }
    catch(err){
        console.log(err);
    }
});



module.exports = router;
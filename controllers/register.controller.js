const express = require('express');
const route = express.Router();
const UserModel = require('../models/register.model');
const {validateEmail,validatePassword,validateName} = require('../validation/auth');
const bcrypt = require('bcrypt');

route.post('/signup',async(req,res)=>{
    const name = validateName(req.body.name);
    const email = validateEmail(req.body.email);
    const password = validatePassword(req.body.password);

    if(name=="")
    return res.status(400).send({
        message:"name should be atleast 3 character..."
    });

    if(email=="")
    return res.status(400).send({
        message:"email is not valid! please provide valid email..."
    });

    if(password=="")
    return res.status(400).send({
        message:"password should be atleast 6 character or number..."
    });
    
    const exist = await UserModel.findOne({email:email});
    try {
        if(exist)
        return res.status(400).send({
            message:"user already exists..."
        })

        const salt = await bcrypt.genSalt(10);
        const encryptpass = await bcrypt.hash(password,salt);

        await UserModel.create({
            name:name,
            email:email,
            password:encryptpass,
            premium:false
        });
        return res.status(200).send({
            message:"signup successfully..."
        });

    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        });
    }
})


module.exports = route;
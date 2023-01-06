const express = require('express');
const route = express.Router();
const userModel = require('../models/register.model');
const { validateEmail, validatePassword } = require('../validation/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

route.post('/login', async (req, res) => {
    const email = validateEmail(req.body.email);
    const password = validatePassword(req.body.password);

    if (email == "")
        return res.status(400).send({
            message: "email is not valid! please provide valid email..."
        })

    if (password == "")
        return res.status(400).send({
            message: "password should be atleast 6 character or number..."
        })

    try {
        const checkUser = await userModel.findOne({ email: email });

        if (!checkUser)
            return res.status(404).send({
                message: "user not found! please signup..."
            })

        const verifyPass = await bcrypt.compare(password, checkUser.password);

        if (!verifyPass)
            return res.status(400).send({
                message: "password is incorrect..."
            })

        const token = jwt.sign({user_id:checkUser._id,name:checkUser.name,email:checkUser.email,premium:checkUser.premium}, process.env.PRIVATE_KEY);
        return res.status(200).send({
            message: "login successfully...",
            token: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "internal server error"
        });
    }
})
module.exports = route;
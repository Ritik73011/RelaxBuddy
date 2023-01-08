const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { validateEmail } = require('../validation/auth');
const usersModel = require('../models/register.model');
const bcrypt = require('bcrypt');
router.get('/forget-password', async (req, res) => {
    const input_email = req.body.email;
    const email = validateEmail(input_email);
    
    if (email == "")
        return res.status(400).send({
            message: "please provide valid email"
        })

    try {
        const user = await usersModel.findOne({ email: email });

        if (!user)
            return res.status(400).send({
                message: "user not found..."
            })

        let transporter = nodemailer.createTransport({
            service:"gmail",
            port: 587,
            secure: false,
            auth: {
                user: process.env.admin,
                pass: process.env.password,
            },
        });

        const genRandomOtp = Math.floor(100000 + Math.random() * 900000);
        let info = await transporter.sendMail({
            from: process.env.admin,
            to: email,
            subject: "Reset Password OTP",
            text: `Hii, ${user.name} Your OTP is :- `,
            html: `<b>${genRandomOtp}</b>`,
        });

        return res.status(200).send({
            message: "otp sended successfully....",
            OTP: genRandomOtp,
            _id:user._id
        })

    } catch (error) {
        return res.status(500).send({
            message: "internal server error",
        })
    }
})

router.patch('/update-password/:id',async(req,res)=>{
    const id = req.params.id;
    const password = req.body.password;

    try {
        const salt = await bcrypt.genSalt(10);
        const encryptpass = await bcrypt.hash(password,salt);
        
        await usersModel.findByIdAndUpdate(id,{password:encryptpass});
        return res.status(200).send({
            message:"password updated..."
        })
    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        })
    }
})
module.exports = router;
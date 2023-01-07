const express = require('express');
const route = express.Router();
const songsModel = require('../models/songs.model');
const {VerifyUser} = require('../validation/user.middleware');

route.get('/premium-songs',VerifyUser, async(req,res)=>{
    const premium = req.premium;
    try {
        const songs = await songsModel.find({premium:true});
        if(premium)
        return res.status(200).send({
            songs:songs
        })

        return res.status(400).send({
            message:"you are not our premium member..."
        })
    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        })
    }
});

module.exports = route;
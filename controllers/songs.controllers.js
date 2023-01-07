const express = require('express');
const route = express.Router();
const songsModel = require('../models/songs.model');

route.get('/songs/:cat',async(req,res)=>{
    try {
        const songs = await songsModel.find({category:req.params.cat,premium:false});
        return res.status(200).send({
            songs:songs
        })
    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        })
    }
});

module.exports = route;
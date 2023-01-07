const express = require('express');
const route = express.Router();
const songsModel = require('../models/songs.model');

route.get('/premium-songs',async(req,res)=>{
    try {
        const category = await songsModel.find().distinct("category");
        return res.status(200).send({
            category:category
        })
    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        })
    }
});

module.exports = route;
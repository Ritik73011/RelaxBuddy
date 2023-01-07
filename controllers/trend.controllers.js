const express = require('express');
const route = express.Router();
const trendSongs = require('../models/trend.model');
route.get('/trending-songs',async(req,res)=>{
    try {
        const songs = await trendSongs.find();
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
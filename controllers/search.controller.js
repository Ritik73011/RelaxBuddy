const express = require('express');
const route = express.Router();
const songsModel = require('../models/songs.model');

route.get('/songs',async(req,res)=>{
    const {search} = req.query; 
    try {
        let obj={
            premium:false
        }
        if(search)
        obj.title =  { $regex: search, $options: "i" };

        const songs = await songsModel.find(obj);
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
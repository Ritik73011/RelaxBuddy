const express = require('express');
const route = express.Router();
require('dotenv').config();
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
//get song by id to play
route.get('/trending-songs/:id',async(req,res)=>{
    try {
        const songs = await trendSongs.findOne({_id:req.params.id});
        return res.status(200).send({
            songs:songs
        })
    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        })
    }
});

//for admin
route.post(process.env.ADMIN_ROUTE2,async(req,res)=>{
    const {url,poster,singer,title,category} = req.body;
    try {
        const obj = {
            url:url,
            poster:poster,
            singer:singer,
            title:title,
            category:category,
        }
        await trendSongs.create(obj);
        return res.status(200).send({
            message:"added successfully..."
        })
    } catch (error) {
        return res.status(500).send({
            message:"internal server error",
            error:error
        })
    }
})
module.exports = route;
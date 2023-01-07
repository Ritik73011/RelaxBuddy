const express = require('express');
const route = express.Router();
require('dotenv').config();
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

//for admin
route.post(process.env.ADMIN_ROUTE,async(req,res)=>{
    const {url,poster,singer,title,category,premium} = req.body;
    try {
        let pre = false;
        if(premium=="true")
        pre = true;

        const obj = {
            url:url,
            poster:poster,
            singer:singer,
            title:title,
            category:category,
            premium:pre
        }
        await songsModel.create(obj);
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
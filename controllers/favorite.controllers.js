const express = require('express');
const route = express.Router();
const favSongs = require('../models/favorite.model');
const {getUserId} = require('../validation/user.middleware');

//Adding songs to user favorite section
route.post('/favorite',getUserId,async(req,res)=>{
    const uid = req.user_id;
    const {url,poster,title,singer,category} = req.body;
    try {
        const obj = {
            userId:uid,
            url:url,
            poster:poster,
            title:title,
            singer:singer,
            category:category
        }
        await favSongs.create(obj);
        return res.status(200).send({
            message:"added to your favorites..."
        })
    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        })
    }
});

//getting user favorite sections
route.get('/favorite',getUserId,async(req,res)=>{
    const uid = req.user_id;
    try {
        const songs = await favSongs.find({userId:uid});
        return res.status(200).send({
            songs:songs
        })
    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        })
    }
});

//delete user favorite songs
route.delete('/favorite/:id',async(req,res)=>{
    const id = req.params.id;
    try {
        await favSongs.findByIdAndDelete(id);
        return res.status(200).send({
            message:"removed from your favorites..."
        })
    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        })
    }
})
module.exports = route;
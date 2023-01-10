const express = require('express');
const route = express.Router();
const favSongs = require('../models/favorite.model');
const {getUserId} = require('../validation/user.middleware');

//Adding songs to user favorite section
route.post('/favorite',getUserId,async(req,res)=>{
    const uid = req.user_id;
    const {url,poster,title,singer,category} = req.body;
    try {
        const avilable = await favSongs.findOne({title:title});
        if(avilable)
        return res.status(200).send({
            message:"already added.."
        })
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
route.delete('/favorite/:id',getUserId,async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const uid = req.user_id;
    try {
        let song = await favSongs.findOne({userId:uid,title:id});
        await favSongs.deleteOne(song._id);
        console.log(song);
        return res.status(200).send({
            message:"removed from your favorites..."
        })
    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        })
    }
})
//to get song by id to play
route.get('/favorite/:id',getUserId,async(req,res)=>{
    const id = req.params.id;
    const uid = req.user_id;
    try {
        const song = await favSongs.find({userId:uid});
        if(song)
        return res.status(200).send({
            songs:song
        })
        return res.status(200).send({
            flag:false
        })
    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        })
    }
})
module.exports = route;
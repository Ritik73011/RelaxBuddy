import {Box, Skeleton, Typography} from '@mui/material'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router';
import {api_url,getPremiumSongs,getTrendingSongs,getUserInfo,searchedSongs} from '../../private';
import SingleSong from '../SingleSong/SingleSong';
import '../Category/single.css'
import { useContext } from 'react';
import SongContext from '../../Context/SongContext';
const Songs = ({updateText})=>{
    const {id,trending,premium} = useParams();
    const [song,setSong] = useState([]);
    const [text,setText] = useState("");
   const {premiumS}  = useContext(SongContext);

    const fetchSong =async()=>{
        let responce;
        if(trending){
            responce = await fetch(`${api_url}/${getTrendingSongs}`);
            setText("Trending Songs");
        }
        else{
            responce=await fetch(`${api_url}/${searchedSongs}/${id}`);
            setText(`${id} Songs`);
        }
        let data = await responce.json();
        setSong(data.songs);
        //console.log(data.songs);
    }

    const fetchPremiumSongs =async()=>{
        let responce = await fetch(`${api_url}/${getPremiumSongs}`,{
            method:"GET",
            headers:{
                token:localStorage.getItem('relax-token')
            }
        });
        let data = await responce.json();
        if(data.message){
            updateText(data.message,true)
        }
        else{
            setSong(data.songs);
        }
    }
    useEffect(()=>{
        if(premium){
            /*if(premiumS){
                fetchPremiumSongs();
                setText('Premium Songs');
            }
            else{
                updateText("Your are not premium member",true)
            }*/
            fetchPremiumSongs();
        }
        else{
            fetchSong();
        }
    },[id,premium])
    
    return <Box>
        <Typography variant="h6" sx={{marginTop:"24px",marginBottom:"12px",textAlign:"start"}}>
          {text}
        </Typography>

        {
            song.length>0?
            <Box className='catSl' sx={{overflow:"scroll",overflowX:"hidden",zIndex:"-10",height:"325px"}}>
                {
                    song.map((ele)=>{
                        return <SingleSong key={ele._id} ele={ele}/>
                    })
                }
            </Box>:<Box>
            <Skeleton width={'100%'} height={120}/>
            <Skeleton width={'100%'} height={120}/>
            <Skeleton width={'100%'} height={120}/>
            </Box>
        }
    </Box>
}
export default Songs;
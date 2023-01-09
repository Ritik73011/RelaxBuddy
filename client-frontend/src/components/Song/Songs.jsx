import {Box, Skeleton, Typography} from '@mui/material'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router';
import {api_url,getTrendingSongs,searchedSongs} from '../../private';
import SingleSong from '../SingleSong/SingleSong';

const Songs = ()=>{
    const {id} = useParams();
    const [song,setSong] = useState([]);

    const fetchSong =async()=>{
        let responce = await fetch(`${api_url}/${searchedSongs}/${id}`);
        let data = await responce.json();
        setSong(data.songs);
        console.log(data.songs);
    }

    useEffect(()=>{
        fetchSong();
    },[id])
    
    return <Box>
        <Typography variant="h6" sx={{marginTop:"24px",marginBottom:"12px",textAlign:"start"}}>
          {id+" "+"Songs"}
        </Typography>

        {
            song.length>0?
            <Box sx={{}}>
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
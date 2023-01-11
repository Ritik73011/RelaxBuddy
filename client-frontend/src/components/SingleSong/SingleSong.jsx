import { Box, Typography } from "@mui/material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useContext } from "react";
import SongContext from "../../Context/SongContext";
import {api_url,favorite} from '../../private';
import { useState } from "react";
import { useEffect } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
const SingleSong = ({ele})=>{
    const {updateUrl} = useContext(SongContext); 
    const[favSong,setFav] = useState([]);

    const handleClick = ()=>{
        updateUrl(ele);
    }
    let flag;
    const log = localStorage.getItem('relax-token');

    if(favSong.length>0){
        const filter = favSong.filter((elem)=>{
            return elem.title===ele.title;
        })
        if(filter.length>0){
            flag = true;
        }
    }
    const fetchAvilableSong = ()=>{
        fetch(`${api_url}/${favorite}/${ele._id}`,{
            method:"GET",
            headers:{
                token:localStorage.getItem('relax-token')
            }
        }).then((responce)=>{
            responce.json().then((data)=>{
                setFav(data.songs);
            })
        })
    }
    const removeFromFav = ()=>{
        fetch(`${api_url}/${favorite}/${ele.title}`,{
            method:"DELETE",
            headers:{
                token:localStorage.getItem('relax-token')
            }
        }).then((responce)=>{
            responce.json().then((data)=>{
                flag = false;
                
           })
        })
    }

    const addToFav = ()=>{
        fetch(`${api_url}/${favorite}`,{
            method:"POST",
            headers:{
                token:log,
                "Content-Type":"Application/json",
            },
            body:JSON.stringify({
                url:ele.url,
                poster:ele.poster,
                title:ele.title,
                singer:ele.singer,
                category:ele.category
            })
        });

    }

    useEffect(()=>{
        if(log){
            fetchAvilableSong();
        }
    },[removeFromFav,addToFav])
    return <Box onClick={handleClick} sx={{display:"flex",gap:"12px",justifyContent:"space-between",marginTop:"16px",cursor:"pointer"}}>
        
        <Box sx={{display:"flex",gap:"12px"}}>
        <Box sx={{minWidth:"50px",minHeight:"55px",maxWidth:"70px",maxHeight:"75px",width:"100%",height:"100%"}}>
            <img width={'100%'} height='100%' src={ele.poster} alt={ele.title} />
        </Box>
        <Box>
        <Typography sx={{fontSize:"16px",textAlign:"left"}}>{ele.title}</Typography>
        <Typography sx={{fontSize:"12px",textAlign:"left"}}>Singer:- {ele.singer}</Typography>
        </Box>
        </Box>
        {log?flag?<FavoriteIcon sx={{color:"#de4646"}} onClick={removeFromFav}/>:<FavoriteBorderIcon  onClick={addToFav}/>:""}
    </Box>
}
export default SingleSong;
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {api_url,favorite} from '../../private';
import { useState } from 'react';
import { useEffect } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  maxWidth:"450px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open,handleClose}) {
const [song,setSong] = useState([]);
const fetchFavSongs = ()=>{
    fetch(`${api_url}/${favorite}`,{
        method:"GET",
        headers:{
            token:localStorage.getItem('relax-token')
        }
    }).then((responce)=>{
        responce.json().then((data)=>{
            setSong(data.songs);
        })
    })
}
useEffect(()=>{
    fetchFavSongs();
},[open]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
               Your favorites songs
          </Typography>
        
        <Box sx={{height:"200px",marginTop:"10px",overflow:"scroll",overflowX:"hidden"}}>
            {song?<Box>{song.map((ele,idx)=>{
                return <Typography key={ele._id}>#{idx+1}: {ele.title}</Typography>
            })}</Box>:<Box>No Songs Found</Box>}
        </Box>
        </Box>
      </Modal>
    </div>
  );
}
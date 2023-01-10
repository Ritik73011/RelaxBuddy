import { Box, Typography } from "@mui/material"

import './player.css'
const Player  = ({url}) =>{
  return <Box sx={{cursor:"pointer"}}>
    <Typography marginTop={'6px'} color='#000000DE' fontSize={'14px'}>{url?'Playing: ':""}{url.title}</Typography>
      <audio id="audio" src={url.url} autoPlay={true} controlsList="nodownload noplaybackrate" controls typeof="audio/mpeg"></audio>
  </Box>
}
export default Player;
import { Box, Typography } from "@mui/material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const SingleSong = ({ele})=>{
    return <Box sx={{display:"flex",gap:"12px",justifyContent:"space-between",marginTop:"16px",cursor:"pointer"}}>
        
        <Box sx={{display:"flex",gap:"12px"}}>
        <Box sx={{minWidth:"50px",minHeight:"55px",maxWidth:"70px",maxHeight:"75px",width:"100%",height:"100%"}}>
            <img width={'100%'} height='100%' src={ele.poster} alt={ele.title} />
        </Box>
        <Box>
        <Typography sx={{fontSize:"16px",textAlign:"left"}}>{ele.title}</Typography>
        <Typography sx={{fontSize:"12px",textAlign:"left"}}>Singer:- {ele.singer}</Typography>
        </Box>
        </Box>
        <FavoriteBorderIcon/>
    </Box>
}
export default SingleSong;
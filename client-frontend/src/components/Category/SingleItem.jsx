import { Box, Typography } from "@mui/material";
import {useNavigate } from "react-router";
const SingleItem = ({ele,idx})=>{
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/songs/${ele}`)
    }
    let url = "";
    if(idx%2===0){
        url = `url(${"https://firebasestorage.googleapis.com/v0/b/relax-buddy-88b52.appspot.com/o/Songs%2Fposters%2Ffinal.jpeg?alt=media&token=9d3f3d8e-b815-4569-b048-b52bffb08296"}) fixed`;
    }else{
        url = `url(${"https://firebasestorage.googleapis.com/v0/b/relax-buddy-88b52.appspot.com/o/Songs%2Fposters%2Fistockphoto-1076840920-612x612.jpg?alt=media&token=c5864bcd-7414-4237-9041-e0e1b794b782"}) fixed`;
    }
    return <Box onClick={handleClick} sx={{width:120,height:120,minWidth:100,minHeight:100,display:"flex",alignItems:"center",justifyContent:"center",
    background:url
    ,cursor:"pointer",
    borderRadius:"8px"}}>
        <Typography sx={{fontWeight:"600"}}>{ele}</Typography>
    </Box>
}
export default SingleItem;
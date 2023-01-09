import { Box, Typography } from "@mui/material";
import {useNavigate } from "react-router";
const SingleItem = ({ele,idx})=>{
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/songs/${ele}`)
    }
    let url = "";
    if(idx%2===0){
        url = `radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)`;
    }else{
        url = `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,91,1) 37%, rgba(0,212,255,1) 100%)`;
    }
    return <Box onClick={handleClick} sx={{width:120,height:120,minWidth:100,minHeight:100,display:"flex",alignItems:"center",justifyContent:"center",
    background:url
    ,cursor:"pointer",
    borderRadius:"8px"}}>
        <Typography>{ele}</Typography>
    </Box>
}
export default SingleItem;
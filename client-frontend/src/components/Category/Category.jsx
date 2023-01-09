import { Box,Skeleton,Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { api_url, getCategory } from "../../private";
import SingleItem from "./SingleItem";
import './single.css'
const Category = ()=>{
    const [category,setCategory] = useState([]);
    const arr = [{i:"1"},{i:"1"},{i:"1"},{i:"1"},{i:"1"},{i:"1"},{i:"1"}]
    const fetchCategory = async () => {
        const responce = await fetch(`${api_url}/${getCategory}`);
        const data = await responce.json();
        setCategory(data.category);
      };
    
      useEffect(()=>{
        fetchCategory();
      },[])
    return <Box>
         <Typography sx={{textAlign:"start",fontSize:"20px",marginBottom:"10px"}}>All Categories</Typography>
        {category.length>0?<Box className="catSl" style={{display:"flex",gap:"16px",width:"100%",overflow:"scroll",overflowY:"hidden"}}>
            {
                category.map((ele,indx)=>{
                    return <SingleItem key={indx+1} ele={ele} idx={indx}/>
                })
            }
        </Box>:<Box className="catSl" style={{display:"flex",gap:"16px",width:"100%",overflow:"scroll",overflowY:"hidden"}}>
        {
            arr.map((ele,idx)=>{
                return <Skeleton key={idx+1} width={600} height={200}/>
            })
        }</Box>}
    </Box>
}
export default Category;
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import {api_url,payment,updatePremium,getUserInfo} from '../../private';
import { useState } from "react";
import { useEffect } from "react";
import {useSearchParams} from 'react-router-dom'
import { useContext } from "react";
import SongContext from '../../Context/SongContext'
const Payment = ()=>{
    const [prime,setPrime] = useState(false);
    const {premiumS} = useContext(SongContext);
    const fetchUserInfo = async()=>{
        const res = await fetch(`${api_url}/${getUserInfo}`,{
            method:"GET",
            headers:{
                token:localStorage.getItem("relax-token")
            }
        });
        const data = await res.json();
        setPrime(data.premium);
    }
    const handlePayment = ()=>{
       const token = localStorage.getItem("relax-token");
       if(token){
        fetch(`${api_url}/${payment}`,{
            method:"POST"
        }).then((res)=>{
            res.json().then((data)=>{
                window.location.href = data.url;
            })
        })
       }
       else{
        alert("you have to login first");
       }
    }
    const [search] = useSearchParams();
    const DDD =()=>{
        if(search.get("success")){
            fetch(`${api_url}/${updatePremium}`,{
                method:"PATCH",
                headers:{
                    token:localStorage.getItem("relax-token")
                }
            }).then((res)=>{
                res.json().then((data)=>{
                    localStorage.setItem("relax-token",data.token);
                })
            })
        }

        if(search.get("canceled")){
            alert("payment failed");
        }
    }
    useEffect(() => {
        DDD();
        fetchUserInfo();
     },[premiumS]);

    if(prime)
    return null;
    return  <ListItemButton onClick={handlePayment}>
    <ListItemIcon><SubscriptionsIcon sx={{color:"#eb5922"}}/></ListItemIcon>
    <ListItemText primary={"Buy Premium"} />
  </ListItemButton>
}
export default Payment;
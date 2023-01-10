import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Fragment, useState } from "react";
import { Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { api_url,getUserInfo,updateUserInfo } from "../../private";
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import SongContext from "../../Context/SongContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function ChildModal() {
  const [open, setOpen] = useState(false);
  const [names,setName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = useState(false);
  const [err, setError] = useState("");
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  const handleClick = ()=>{
        fetch(`${api_url}/${updateUserInfo}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"Application/json",
                token:localStorage.getItem("relax-token")
            },
            body:JSON.stringify({
                name:names
            })
        }).then((res)=>{
            res.json().then((data)=>{
                if(data.token){
                    localStorage.setItem("relax-token",data.token);
                    setOpen2(true);
                    setTimeout(()=>{
                        setOpen2(false);
                        setOpen(false);
                    },2000)
                }
                setError(data.message);
            })
        })
  }
  return (
    <Fragment>
      <Button
        sx={{ textAlign: "center", display:"block",margin:"auto", marginTop: "10px" }}
        onClick={handleOpen}
      >
        UPDATE INFO
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "100%", maxWidth: "450px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Update Name</Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>

          <TextField
            required
            sx={{ width: "100%" }}
            id="standard-error-helper-text"
            label="Name"
            defaultValue=""
            variant="standard"
            onChange={(e)=>setName(e.target.value)}
          />
        <Typography color={"red"}>{err}</Typography>
        <Button
            onClick={handleClick}
            variant="contained"
            sx={{ display: "block", margin: "auto", marginTop: "16px" }}
          >
            UPDATE
          </Button>
            <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
            <Alert
              onClose={handleClose2}
              severity="success"
              sx={{ width: "100%" }}
            >
              Updated Successfully...
            </Alert>
          </Snackbar>
        </Box>
      </Modal>
    </Fragment>
  );
}



//USER PROFILE INFO
export default function Profile({ open, handleClose }) {
  const[userData,setUserData] = useState({});
  const {updatePremiumS}  = useContext(SongContext);
  const fetchUserInfo =() =>{
    fetch(`${api_url}/${getUserInfo}`,{
        method:"GET",
        headers:{
            "token":localStorage.getItem("relax-token")
        }
    }).then((res)=>{
        res.json().then((data)=>{
            setUserData(data);
            updatePremiumS(data.premium);
        })
    });
  }
  const logOut = ()=>{
    localStorage.removeItem('relax-token');
    handleClose();
  }
  useEffect(()=>{
    fetchUserInfo();
  },[])
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "100%", maxWidth: "450px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Profile</Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
    
          <Box sx={{display:"flex",justifyContent:"space-between",marginTop:"6px",alignItems:"center"}}>
          <Typography marginTop={'6px'} variant="h6">Hii, {userData.name}</Typography>
          <LogoutIcon sx={{cursor:"pointer"}} onClick={logOut}/>
          </Box>
          <Box sx={{display:"flex",gap:"12px",marginTop:"6px",alignItems:"center"}}>
            <EmailIcon/> 
            <Typography variant="h6">{userData.email}</Typography>
          </Box>

          {userData.premium ? <Box sx={{display:"flex",gap:"12px",alignItems:"center"}}>
            <VerifiedUserIcon sx={{color:"green"}}/> 
            <Typography variant="h6">{"prime member"}</Typography>
          </Box>:null}
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
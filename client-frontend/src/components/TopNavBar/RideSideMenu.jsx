import { Box, IconButton, useTheme } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from "../../App";
import { useState } from "react";
import NestedModal from "../Login/Login";
const RighSideMenu = ()=>{
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return <Box style={{display:"flex",justifyContent:"center",gap:"10px"}}>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

        <IconButton onClick={handleOpen} type="button" sx={{ p: '10px' }} color='inherit'>
        <AccountCircleIcon/>
      </IconButton>
        <NestedModal open={open} handleClose={handleClose}/>
    </Box>
}
export default RighSideMenu;
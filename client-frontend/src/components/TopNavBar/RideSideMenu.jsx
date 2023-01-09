import { Box, IconButton, useTheme } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from "../../App";
const RighSideMenu = ()=>{
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return <Box style={{display:"flex",justifyContent:"center",gap:"10px"}}>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

        <IconButton type="button" sx={{ p: '10px' }}>
        <AccountCircleIcon color="black"/>
      </IconButton>
    </Box>
}
export default RighSideMenu;
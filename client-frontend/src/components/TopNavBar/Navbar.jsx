import { Box} from "@mui/material";
import RighSideMenu from "./RideSideMenu";
import Search from './Search';
const Navbar = () => {
   
  return (
    <Box style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
      <Search/>
      <RighSideMenu/>
    </Box>
  );
};
export default Navbar;
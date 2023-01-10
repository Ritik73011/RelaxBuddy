import { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { getCategory, api_url } from "../../private";
import Navbar from "../TopNavBar/Navbar";
import Category from "../Category/Category";
import '../Category/single.css'
import Songs from "../Song/Songs";
import { useNavigate } from "react-router";
import SongContext from "../../Context/SongContext";
import Player from "../Player/Player";
const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const {url} = useContext(SongContext);
  const fetchCategory = async () => {
    const responce = await fetch(`${api_url}/${getCategory}`);
    const data = await responce.json();
    let temArr = [];
    temArr.push(data.category[0]);
    temArr.push(data.category[1]);
    temArr.push(data.category[2]);
    temArr.push(data.category[3]);
    setCategory(temArr);
  };

    const navigate = useNavigate();
    const handleClick = (ele)=>{
        navigate(`/songs/${ele}`)
        setMobileOpen(false);
    }

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h5" noWrap component="div">
          RelaxBuddy
        </Typography>
      </Toolbar>
      <Divider />
      <List>

      <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <WhatshotIcon />
            </ListItemIcon>
            <ListItemText primary={"Trending Songs"} />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <WorkspacePremiumIcon />
            </ListItemIcon>
            <ListItemText primary={"Premium Songs"} />
          </ListItemButton>
        </ListItem>

        <Divider />
        {/*Catgeory mapping in Sidebar*/}
        {category.length > 0 ? (
          category.map((ele, idx) => {
            return (
              <ListItem key={idx + 1} disablePadding>
                <ListItemButton onClick={()=>handleClick(ele)}>
                  <ListItemIcon>
                    <AudiotrackIcon />
                  </ListItemIcon>
                  <ListItemText primary={ele} />
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
        {/*Catgeory mapping in Sidebar*/}

      </List>

      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><FavoriteIcon/></ListItemIcon>
            <ListItemText primary={"Favorites"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><SubscriptionsIcon/></ListItemIcon>
            <ListItemText primary={"Buy Premium"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon style={{color:"grey"}} />
          </IconButton>
          <Navbar/>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        className="catSl"
        position={'relative'}
        sx={{
          p: 3,
          overflow:"scroll",
          overflowY:"hidden",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight:'100vh'
        }}
      >
        <Toolbar />

        {/*Category and Songs Box*/}
        <Box>
          <Category/>
          <Songs/>
        </Box>
        {/*Category and Songs Box*/}

        {/*Bottom Songs Player*/}
        <Box  position="absolute" bottom="0px" right='0px' sx={{zIndex:'10',backgroundColor:"#e5e7ea",width:"100%"}}>
        <Divider/>
          <Player url={url}/>
        </Box>
        {/*Bottom Songs Player*/}

      </Box>
    </Box>
  );
}
export default ResponsiveDrawer;

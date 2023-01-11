import './App.css';
import ResponsiveDrawer from './components/Sidebar/Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import SongContext from './Context/SongContext';
export const ColorModeContext = createContext({ toggleColorMode: () => {} });
function App() {

  const [mode, setMode] = useState('light');
  const navigate = useNavigate();
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const [url,setUrl] = useState('');
  const [premiumS,setPremiumS] = useState(null);

  const updateUrl = (url)=>{
    setUrl(url);
  }
  const updatePremiumS = (val)=>{
    setPremiumS(val)
  }
  useEffect(()=>{
    navigate('/trending')
  },[])
  return (
    <div className="App">
       <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SongContext.Provider value={{url,updateUrl,updatePremiumS,premiumS}}>

      <Routes>
        <Route path='/:trending' element={<ResponsiveDrawer/>}/>
        <Route path='/songs/:id' element={<ResponsiveDrawer/>}/>
        <Route path='/songs/premium/:premium' element={<ResponsiveDrawer/>}/>
      </Routes>
        </SongContext.Provider>
      </ThemeProvider>

    </ColorModeContext.Provider>
    </div>
  );
}

export default App;

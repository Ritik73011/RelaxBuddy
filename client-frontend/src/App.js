import './App.css';
import ResponsiveDrawer from './components/Sidebar/Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router';
import SongContext from './Context/SongContext';
export const ColorModeContext = createContext({ toggleColorMode: () => {} });
function App() {

  const [mode, setMode] = useState('light');
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

  const updateUrl = (url)=>{
    setUrl(url);
  }
  
  return (
    <div className="App">
       <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SongContext.Provider value={{url,updateUrl}}>

      <Routes>
        <Route path='/' element={<ResponsiveDrawer/>}/>
        <Route path='/songs/:id' element={<ResponsiveDrawer/>}/>
      </Routes>
        </SongContext.Provider>
      </ThemeProvider>

    </ColorModeContext.Provider>
    </div>
  );
}

export default App;

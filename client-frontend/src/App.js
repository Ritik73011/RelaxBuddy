import './App.css';
import ResponsiveDrawer from './components/Sidebar/Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router';
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
  
  return (
    <div className="App">
       <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<ResponsiveDrawer/>}/>
        <Route path='/songs/:id' element={<ResponsiveDrawer/>}/>
      </Routes>
      </ThemeProvider>

    </ColorModeContext.Provider>
    </div>
  );
}

export default App;

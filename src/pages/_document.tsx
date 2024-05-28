import { Html, Head, Main, NextScript } from 'next/document'
import ColorModeContext from '@/ColorModeContext';
import { ThemeProvider, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useMemo, useState } from 'react';
 
export default function Document() {

    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }), [],
    );
    
  const theme  = useMemo(() => createTheme({
    palette:{
      mode, 
      primary: {
        main: '#327FDE',
        light: '#EFF6FF',
      },
      secondary: {
        main: '#EFF6FF',
        dark: '#73B2FF'
      },
      text: {
        primary: mode === "light" ? grey[900] : grey[100] ,
        secondary: mode === "light" ? '#585858' : grey[900],
      },
    },
    typography: {
      fontFamily: '"Istok Web", sans-serif',
      allVariants: {
        textTransform: 'none', // Set textTransform to none for all Typography components
      },
      h1: {
        fontSize: '36px',
        fontWeight: 700, 
      },
      h2: {
        fontSize: '28px', // Customize the font size for heading level 2
        fontWeight: 700,
      },
      body2: {
        fontSize: '12px',
        fontWeight: 400,
      }
    },
    components:{
      MuiTypography:{
        styleOverrides:{
          root:{
            color: mode === "dark" ? "#fff" : "#000"
          }
        }
      }
    }
  }), [mode])

  return (
  <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
          <Html>
              <Head />
              <body>
                  <Main />
                  <NextScript />
              </body>
          </Html>
      </ThemeProvider>
  </ColorModeContext.Provider>
  )
}
'use client';

import '@/styles/globals.css';
import ColorModeContext from "@/ColorModeContext"
import { ThemeProvider, createTheme } from "@mui/material"
import { grey } from "@mui/material/colors";
import {  ReactNode, useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store"; 
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  
  const router = useRouter() 

  const verify = async (accessToken: string, publicKey: string) => {
    const headers = { 
      'Content-Type': 'application/json',
      'authorization': `Bearer ${accessToken}`,
      'user-key': publicKey
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-user`, {
      method: 'POST',
      headers
    })
    const responseData = await response.json();
    if(responseData.success === false) {
      const refresh = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
        method: 'POST',
        headers
      })
      const refreshToken = await refresh.json();
      return refreshToken;
    } else {
      return responseData;
    }
  }

  useEffect(() => {
    const checkVerify = async () => {
      const accessToken = localStorage.getItem('accessToken')
      if(accessToken) {
        const publicKey = localStorage.getItem('userKey') as string
        const verifyResult = await verify(accessToken, publicKey);
        if(!verifyResult.success) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('userKey')
          router.push('/signIn')
        } else {
          localStorage.setItem('accessToken', verifyResult.data.accessToken)
        }
      } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userKey')
        router.push('/signIn')
      }
    }

    checkVerify()
  },[])


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
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <html lang="en">
            <body>
              <main>{children}</main>
            </body>
          </html>
        </ThemeProvider>
      </Provider>
  </ColorModeContext.Provider>
  )
}
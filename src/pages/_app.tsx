import '@/styles/globals.css';
import { useEffect, type ReactElement, type ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/app/store';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout';
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter() 
  const getLayout = Component.getLayout ?? ((page) => page)

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
 
  return getLayout(
    <Provider store={store}>
      <Layout>
        <Component
          {...pageProps}
        />
      </Layout>
    </Provider>
  )
}
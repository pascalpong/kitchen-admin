"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

const withAuth = (WrappedComponent: React.ComponentType<any>) => {

  const WithAuth = (props: any) => {
    const router = useRouter();
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
    }, [router]);

    return <WrappedComponent {...props} />;
  }; 

  return WithAuth;
};

export default withAuth;

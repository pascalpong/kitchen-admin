"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const userKey = localStorage.getItem('userKey');

      if (!accessToken || !userKey) {
        router.push('/signIn');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  }; 

  return WithAuth;
};

export default withAuth;

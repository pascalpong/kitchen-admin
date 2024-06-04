import {
    fetchBaseQuery
  } from '@reduxjs/toolkit/query';
   
  export const baseQueryWithoutToken = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`
  });
   
  export const baseQueryWithToken = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("accessToken");
      const publicKey = localStorage.getItem("userKey");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
        headers.set("user-key", `${publicKey}`);
      }
      return headers;
    },
  })
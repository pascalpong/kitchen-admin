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
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  })
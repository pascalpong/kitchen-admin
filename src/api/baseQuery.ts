import {
    fetchBaseQuery
  } from '@reduxjs/toolkit/query';
   
  export const baseQueryWithoutToken = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`
  });
   
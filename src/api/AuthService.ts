import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

export const AuthService = createApi({
    reducerPath: 'AuthService',
    baseQuery: baseQueryWithoutToken,
    endpoints: (builder) => ({
      authGoogle: builder.mutation<any, any>({
        query: (body) => ({
          url: '/auth/google',
          method: 'POST',
          body
        })
      }),
    })
});
  
export const { useAuthGoogleMutation } = AuthService;
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

export const AuthVerifyService = createApi({
    reducerPath: 'AuthVerifyService',
    baseQuery: baseQueryWithoutToken,
    endpoints: (builder) => ({
      authVerifyUser: builder.mutation<any, any>({
        query: (body) => ({
          url: '/auth/verify-user',
          method: 'POST',
          body
        })
      })
    })
});
  
export const { useAuthVerifyUserMutation } = AuthVerifyService;
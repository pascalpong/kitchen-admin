import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from './baseQuery';

export const UserService = createApi({
    reducerPath: 'UserService',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
      getUsers: builder.query<any, any>({
        query: () => ({
          url: '/user',
          method: 'GET'
        })
      })
    })
});
  
export const { useGetUsersQuery } = UserService;
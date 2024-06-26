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
      }),
      assignUserType: builder.mutation<any, any>({
        query: (body) => ({
          url: '/user/assign',
          method: 'PATCH',
          body
        })
      })
    })
});
  
export const { useGetUsersQuery, useAssignUserTypeMutation } = UserService;
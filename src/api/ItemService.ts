import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from './baseQuery';

export const ItemService = createApi({
    reducerPath: 'ItemService',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
      getUsers: builder.query<any, any>({
        query: () => ({
          url: '/item',
          method: 'GET'
        })
      }),
      assignUserType: builder.mutation<any, any>({
        query: (body) => ({
          url: '/item/create',
          method: 'POST',
          body
        })
      })
    })
});
  
export const { useGetUsersQuery, useAssignUserTypeMutation } = ItemService;
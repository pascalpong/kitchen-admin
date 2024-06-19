import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from './baseQuery';

export const ItemService = createApi({
    reducerPath: 'ItemService',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
      getItems: builder.query<any, any>({
        query: () => ({
          url: '/item',
          method: 'GET'
        })
      }),
      createItems: builder.mutation<any, any>({
        query: (formData) => ({
          url: '/item/create',
          method: 'POST',
          body: formData
        })
      })
    })
});
export const { useGetItemsQuery, useCreateItemsMutation } = ItemService;
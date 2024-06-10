import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from './baseQuery';

export const LotService = createApi({
    reducerPath: 'LotService',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
      getLots: builder.query<any, any>({
        query: () => ({
          url: '/lot',
          method: 'GET'
        })
      }),
      createLots: builder.mutation<any, any>({
        query: (body) => ({
          url: '/lot/create',
          method: 'POST',
          body
        })
      }),
      updateLot: builder.mutation<any, any>({
        query: (body) => ({
          url: '/lot/update',
          method: 'PATCH',
          body
        })
      })
    })
});
  
export const { useGetLotsQuery, useCreateLotsMutation, useUpdateLotMutation } = LotService;
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
      getLotDetails: builder.query<any, any>({
        query: ({id}) => ({
          url: `/lot/${id}`,
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
      updateLotStatus: builder.mutation<any, any>({
        query: (body) => ({
          url: '/lot/update/status',
          method: 'PATCH',
          body
        })
      })
    })
});
  
export const { useGetLotsQuery, useCreateLotsMutation, useUpdateLotStatusMutation, useGetLotDetailsQuery } = LotService;
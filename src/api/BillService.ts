import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken } from './baseQuery';

export const BillService = createApi({
    reducerPath: 'BillService',
    baseQuery: baseQueryWithToken,
    endpoints: (builder) => ({
      getBills: builder.query<any, any>({
        query: () => ({
          url: '/bill',
          method: 'GET'
        })
      }),
      createBill: builder.mutation<any, any>({
        query: (body) => ({
          url: '/bill/create',
          method: 'POST',
          body
        })
      }),
      closeBill: builder.mutation<any, any>({
        query: (body) => ({
          url: '/bill/close',
          method: 'PATCH',
          body
        })
      }),
    })
});
  
export const { useCreateBillMutation, useGetBillsQuery, useCloseBillMutation } = BillService;
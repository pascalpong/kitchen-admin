import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

export const ScanService = createApi({
    reducerPath: 'ScanService',
    baseQuery: baseQueryWithoutToken,
    endpoints: (builder) => ({
      getBillWithLotCode: builder.query<any, any>({
        query: ({lotCode, body}) => ({
          url: `/bill/lotCode/${lotCode}`,
          method: 'GET',
          body
        })
      }),
    })
});
  
export const { useGetBillWithLotCodeQuery } = ScanService;
"use client";

import { Box, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { useGetOrdersQuery } from '@/api/OrderService';
import withAuth from '@/hoc/withAuth';
 

const headCells = [
  {
    name: 'Lot',
    label: 'Lot.name'
  },
  {
    name: 'Items',
    label: 'items'
  },
  {
    name: 'Status',
    label: 'status'
  },
  {
    name: 'orderedBy',
    label: 'Ordered by'
  },
];

const UserTable = () => {

  const { data: getOrders, refetch } = useGetOrdersQuery({})
  const [ orders, setOrders ] = useState<any[]>([]);
  const [ refetchData, setRefetchData ] = useState<boolean>(false)

  useEffect(() => {
    if(refetchData) {
      refetch()
      setRefetchData(false)
    }
  },[refetchData])

  useEffect(() => {
    if(getOrders) {
      const data = getOrders.data;
      setOrders(data)
    }
  },[getOrders])

   
  return (
      <>
      <Paper elevation={3} 
        sx={{
          padding:4
        }}
      >
        <Box>
          <DataTable data={orders} headCells={headCells} />
        </Box>
      </Paper>
      </>
  );
}

export default withAuth(UserTable);
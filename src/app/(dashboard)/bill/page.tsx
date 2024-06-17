"use client";

import { Box, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { useGetBillsQuery } from '@/api/BillService';
import withAuth from '@/hoc/withAuth';
 

const headCells = [
  {
    name: 'Lot.name',
    label: 'Lot id'
  },
  {
    name: 'status',
    label: 'Status'
  },
  {
    name: 'User.name',
    label: 'Created by'
  },
  {
    name: 'people',
    label: 'Seated'
  },
];

const BillTable = () => {

  const { data: getBills, refetch } = useGetBillsQuery({})
  const [ bills, setBills ] = useState<any[]>([]);
  const [ path, setPath ] = useState('table')

  useEffect(() => {
    if(getBills) {
      const data = getBills.data;
      setBills(data)
    }
  },[getBills])
 

  return (
      <>
      <Paper elevation={3} 
        sx={{
          padding:4
        }}
      >
        <Box>
          { path === "table" && (
            <DataTable data={bills} headCells={headCells} />
          )}
        </Box>
      </Paper>
      </>
  );
}

export default withAuth(BillTable);
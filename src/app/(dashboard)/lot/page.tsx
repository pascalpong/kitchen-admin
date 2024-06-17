"use client";

import { Box, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import CreateCategory from './CreateItems';
import DataTable from './DataTable';
import { useCreateLotsMutation, useGetLotsQuery } from '@/api/LotService';
import withAuth from '@/hoc/withAuth';
 

const headCells = [
  {
    name: 'name',
    label: 'Full name'
  },
  {
    name: 'amount',
    label: 'Amount'
  },
  {
    name: 'status',
    label: 'Status'
  },
  {
    name: 'qrcode',
    label: 'QR Code'
  },
];

const UserTable = () => {

  const { data: getLots, refetch } = useGetLotsQuery({})
  const [ lots, setLots ] = useState<any[]>([]);
  const [ path, setPath ] = useState('table')
  const [ refetchData, setRefetchData ] = useState<boolean>(false)
  const [valueList, setValueList] = useState<string[]>([])
  const [ createLots ] = useCreateLotsMutation()
  const [ toClear, setToClear ] = useState<boolean>(false)

  useEffect(() => {
    if(refetchData) {
      refetch()
      setRefetchData(false)
    }
  },[refetchData])

  useEffect(() => {
    if(getLots) {
      const data = getLots.data;
      setLots(data)
    }
  },[getLots])

  const toCreateCategories = async (data: any[]) => {
    const items = await createLots({data})
    if(items.data.success) {
      setToClear(true)
      refetch()
    }
  }

  useEffect(() => {
    if(valueList.length > 0) {
      toCreateCategories(valueList)
    }
  },[valueList])

  return (
      <>
      <Paper elevation={3} 
        sx={{
          padding:4
        }}
      >
        <Box py={1}>
          <CreateCategory valueList={setValueList} toClear={toClear} setToClear={setToClear} />
        </Box> 
        <Box>
        { path === "table" && (
          <DataTable data={lots} headCells={headCells} />
        )}
        </Box>
      </Paper>
      </>
  );
}

export default withAuth(UserTable);
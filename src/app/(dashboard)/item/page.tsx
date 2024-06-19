"use client";

import { Box, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCreateCategoryMutation, useGetCategoriesQuery } from '@/api/CategoryService';
import CreateCategory from './CreateItems';
import DataTable from './DataTable';
import withAuth from '@/hoc/withAuth';
import { useCreateItemsMutation, useGetItemsQuery } from '@/api/ItemService';
 

const headCells = [
  {
    name: 'name',
    label: 'Full name'
  },
  {
    name: 'User.name',
    label: 'Created by'
  },
];

const UserTable = () => {

  const { data: getItems, refetch } = useGetItemsQuery({})
  const [ items, setItems ] = useState<any[]>([]);
  const [ path, setPath ] = useState('table')
  const [ refetchData, setRefetchData ] = useState<boolean>(false)
  const [valueList, setValueList] = useState<string[]>([])
  const [ createItems ] = useCreateItemsMutation()
  const [ toClear, setToClear ] = useState<boolean>(false)

  useEffect(() => {
    if(refetchData) {
      refetch()
      setRefetchData(false)
    }
  },[refetchData])

  useEffect(() => {
    if(getItems) {
      const data = getItems.data;
      setItems(data)
    }
  },[getItems])

  const toCreateCategories = async (items: string[]) => {
    const categories = await createItems({items})
    if(categories.data.success) {
      setToClear(true)
      refetch()
    }
  }

  useEffect(() => {
    if(valueList.length > 0) {
      console.log(valueList)
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
            <DataTable data={items} headCells={headCells} />
          )}
        </Box>
      </Paper>
      </>
  );
}

export default withAuth(UserTable);
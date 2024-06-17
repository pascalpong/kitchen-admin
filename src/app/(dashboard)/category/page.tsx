"use client";

import { Box, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCreateCategoryMutation, useGetCategoriesQuery } from '@/api/CategoryService';
import CreateCategory from './CreateCategory';
import DataTable from './DataTable';
import withAuth from '@/hoc/withAuth';
 

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

  const { data: getCategories, refetch } = useGetCategoriesQuery({})
  const [ categories, setCategories ] = useState<any[]>([]);
  const [ path, setPath ] = useState('table')
  const [ refetchData, setRefetchData ] = useState<boolean>(false)
  const [valueList, setValueList] = useState<string[]>([])
  const [ createCategories ] = useCreateCategoryMutation()
  const [ toClear, setToClear ] = useState<boolean>(false)

  useEffect(() => {
    if(refetchData) {
      refetch()
      setRefetchData(false)
    }
  },[refetchData])

  useEffect(() => {
    if(getCategories) {
      const data = getCategories.data;
      setCategories(data)
    }
  },[getCategories])

  const toCreateCategories = async (names: string[]) => {
    const categories = await createCategories({names})
    if(categories.data.success) {
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
            <DataTable data={categories} headCells={headCells} />
          )}
        </Box>
      </Paper>
      </>
  );
}

export default withAuth(UserTable);
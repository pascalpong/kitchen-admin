"use client";

import { useGetUsersQuery } from '@/api/UserService';
import DataTable from '@/components/DataTable';
import { Box, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { usePathname, useRouter } from 'next/navigation';
import Assign from './Assign';
 

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Full name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
];

const UserTable = () => {

  const router = useRouter()
  const pathName = usePathname()

  const { data: getUsers, refetch } = useGetUsersQuery({})
  const [ users, setUsers ] = useState<any[]>([]);
  const [ path, setPath ] = useState('table')
  const [ refetchData, setRefetchData ] = useState<boolean>(false)

  useEffect(() => {
    if(refetchData) {
      refetch()
      setRefetchData(false)
    }
  },[refetchData])

  useEffect(() => {
    if(getUsers) {
      const data = getUsers.data;
      setUsers(data)
    }
  },[getUsers])
   
  return (
      <>
      <Paper elevation={3} 
        sx={{
          padding:4
        }}
      >
        <Box py={1}>
          <Grid container 
            spacing={{ xs: 2, md: 3 }} 
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item 
              xs={2} sm={4} md={4}
            >
              <LoadingButton
                fullWidth
                onClick={() => setPath('table')}
                size="small"
                endIcon={<SendIcon />} 
                loadingPosition="end"
                variant={path === "table" ? "contained" : "outlined"}
              >
                <span>List</span>
              </LoadingButton>
            </Grid>
            <Grid item 
              xs={2} sm={4} md={4}
            >
              <LoadingButton
                fullWidth
                onClick={() => setPath('assign')}
                size="small"
                endIcon={<SendIcon />} 
                loadingPosition="end"
                variant={path === "assign" ? "contained" : "outlined"}
              >
                <span>Assign</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
        <Box>
          { path === "table" && (
            <DataTable data={users} headCells={headCells} />
          ) || path === "assign" && (
            <Assign data={users} toRefetch={setRefetchData}/>
          )}
        </Box>
      </Paper>
      </>
  );
}

export default UserTable;
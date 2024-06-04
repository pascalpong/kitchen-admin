"use client";

import { useGetUsersQuery } from '@/api/UserService';
import DataTable from '@/components/DataTable';
import { useEffect, useState } from 'react';
 

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
  }
];

const UserTable = () => {

  const getUsers = useGetUsersQuery({})
  const [ users, setUsers ] = useState<any[]>([]);

  useEffect(() => {
    if(getUsers.isSuccess) {
      const data = getUsers.data.data;
      setUsers(data)
    }
  },[getUsers])
   
  return (
      <>
        <DataTable data={users} headCells={headCells} />
      </>
  );
}

export default UserTable;
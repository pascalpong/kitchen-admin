import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { usePathname, useRouter } from 'next/navigation';

export const MainListItems = () => {
  const router = useRouter()

  const pathname = usePathname()

  return (
    <React.Fragment>
      <ListItemButton
        className={`link ${pathname === '/dashboard' ? 'active' : ''}`}
        onClick={()=>router.push('/dashboard',{scroll: false})}
      > 
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" /> 
      </ListItemButton>
      <ListItemButton
        className={`link ${pathname === '/user' ? 'active' : ''}`}
        onClick={()=>router.push('/user',{scroll: false})}
      > 
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Users" /> 
      </ListItemButton>
      <ListItemButton
        className={`link ${pathname === '/category' ? 'active' : ''}`}
        onClick={()=>router.push('/category',{scroll: false})}
      > 
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" /> 
      </ListItemButton>
      <ListItemButton
        className={`link ${pathname === '/item' ? 'active' : ''}`}
        onClick={()=>router.push('/item',{scroll: false})}
      > 
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Items" /> 
      </ListItemButton>
    </React.Fragment>
  );
}

export const SecondaryListItems = () => {

  const router = useRouter()

  return(
    <React.Fragment>
      <ListSubheader component="div" inset>
        Orders, Lots and Bills
      </ListSubheader>
      <ListItemButton
        onClick={()=>router.push('/order',{scroll: false})}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
      <ListItemButton
        onClick={()=>router.push('/lot',{scroll: false})}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Lots" />
      </ListItemButton>
      <ListItemButton
        onClick={()=>router.push('/bill',{scroll: false})}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Bills" />
      </ListItemButton>
    </React.Fragment>
  )
}


import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const MainListItems = () => {

  const pathname = usePathname()

  return (
    <React.Fragment>
      <ListItemButton
        className={`link ${pathname === '/dashboard' ? 'active' : ''}`}
        href="/dashboard"
      > 
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" /> 
      </ListItemButton>
      <ListItemButton
        className={`link ${pathname === '/user' ? 'active' : ''}`}
        href="/user"
      > 
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Users" /> 
      </ListItemButton>
      <ListItemButton
        className={`link ${pathname === '/category' ? 'active' : ''}`}
        href="/category"
      > 
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" /> 
      </ListItemButton>
      <ListItemButton
        className={`link ${pathname === '/item' ? 'active' : ''}`}
        href="/item"
      > 
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Items" /> 
      </ListItemButton>
    </React.Fragment>
  );
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
  </React.Fragment>
);
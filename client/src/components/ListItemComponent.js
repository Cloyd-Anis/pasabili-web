import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReportIcon from '@mui/icons-material/Report';
import Typography from "@mui/material/Typography";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem component="a" href="/dashboard">
      <ListItemIcon style={{ color: 'white' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: 'white' }}>Dashboard</Typography>} />
    </ListItem>

    <ListItem component="a" href="/employees">
      <ListItemIcon style={{ color: 'white' }}>
        <SupervisorAccountIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: 'white' }}>Employees</Typography>} />
    </ListItem>

    <ListItem component="a" href="/customers">
      <ListItemIcon style={{ color: 'white' }}>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: 'white' }}>Customers</Typography>} />
    </ListItem>

    <ListItem component="a" href="/transactions">
      <ListItemIcon style={{ color: 'white' }}>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: 'white' }}>Transactions</Typography>} />
    </ListItem>

    <ListItem component="a" href="/reports">
      <ListItemIcon style={{ color: 'white' }}>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: 'white' }}>Orders</Typography>} />
    </ListItem>

    <ListItem component="a" href="/concerns">
      <ListItemIcon style={{ color: 'white' }}>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ color: 'white' }}>Concerns</Typography>} />
    </ListItem>
  </div>
)

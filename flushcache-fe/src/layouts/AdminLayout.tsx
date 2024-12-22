import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <Header />
        <Box sx={{ padding: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;

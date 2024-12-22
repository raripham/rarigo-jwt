import React from 'react';
import { Button } from "flowbite-react";
import { Box } from '@mui/material';
import Sidebar from '../components/SideBar';
import CFTable from '../modules/cloudflare/components/CFTable';

// const CFLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const CFLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <h3 className="text-2xl font-bold mb-4">CloudFlares</h3>
        <CFTable />
        {/* <Box sx={{ padding: 2 }}>{children}</Box> */}
        <div className="flex flex-wrap items-start gap-2">
            <Button size="sm">Purge</Button>
        </div>
      </Box>
    </Box>
  );
};

export default CFLayout;

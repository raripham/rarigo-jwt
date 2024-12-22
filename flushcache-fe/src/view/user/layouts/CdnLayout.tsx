import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/SideBar';
import CdnTable from '../modules/cdns/components/CdnTable';

const CdnLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      {/* Main Content */}
      
      <div className="flex flex-col flex-1">
        <h2 className="text-2xl font-bold mb-4">Cdns</h2>
        <CdnTable />
      </div>
      {/* <Box sx={{ flex: 1 }}>
        <h1 className="text-2xl font-bold mb-4">Cdns</h1>
        <Box sx={{ padding: 2 }}>{children}</Box>
      </Box> */}
    </Box>
  );
};

export default CdnLayout;

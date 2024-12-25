import React from 'react';
import { Button } from "flowbite-react";
import { Box } from '@mui/material';
import Sidebar from '../components/SideBar';
import CFTable from '../modules/cloudflares/CFTable';
import CreateCF from '../modules/cloudflares/CreateCF';

interface CF {
  cf_domain: string;
}

interface User {
  email: string;
  role: string;
}

const CFs: CF[] = [
  {cf_domain: "ventory.gg"},
  {cf_domain: "tocen.co"}]

const CFLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <div className="p-4 sm:ml-4">
          <div className="container mx-auto p-4 space-y-8">
            <section>
            <h3 className="font-bold mb-4">CloudFlares</h3>
            <CFTable data={CFs}/>
            </section>
            <CreateCF/>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default CFLayout;

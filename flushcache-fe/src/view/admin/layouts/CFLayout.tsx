import React, { useEffect, useState } from 'react';
import { Button } from "flowbite-react";
import { Box } from '@mui/material';
import Sidebar from '../components/SideBar';
import CFTable from '../modules/cloudflares/CFTable';
import CreateCF from '../modules/cloudflares/CreateCF';
import { useNavigate } from 'react-router-dom';

interface CF {
  cf_domain: string;
}

interface User {
  email: string;
  role: string;
}

// const CFs: CF[] = [
//   {cf_domain: "ventory.gg"},
//   {cf_domain: "tocen.co"}]

const CFLayout: React.FC = () => {
  const [cfs, setCFs] = useState<CF[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
      // Fetch data from the API
      const fetchCdns = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/getallcfs', {
            method: 'GET',
            credentials: 'include',
          });
          if (response.status === 401 ){
            navigate("/login");
          }
          const data = await response.json();
          if (data != null) {
            setCFs(data); // Set the users data
          }
  
        } catch (error) {
          console.error('Error fetching cdns:', error);
        }
      };
  
      fetchCdns();
    }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <div className="p-4 sm:ml-4">
          <div className="container mx-auto p-4 space-y-8">
            <section>
            <h3 className="font-bold mb-4">CloudFlares</h3>
            <CFTable data={cfs}/>
            </section>
            <CreateCF/>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default CFLayout;

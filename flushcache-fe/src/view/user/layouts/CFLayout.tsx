import React, { useEffect, useState } from 'react';
import { Button } from "flowbite-react";
import { Box } from '@mui/material';
import Sidebar from '../components/SideBar';
import CFTable from '../modules/cloudflare/CFTable';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

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
// const CFLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

const CFLayout: React.FC = () => {
  const [cfs, setCdns] = useState<CF[]>([]);
  const navigate = useNavigate();
  const { userC } = useAuth();
  useEffect(() => {
      // Fetch data from the API
      const fetchUsers = async () => {
        try {
          // const user: User = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
          console.log("user: ", userC)
          const response = await fetch('http://localhost:8000/api/cfs?' + new URLSearchParams({
            email: userC.email,
          }), {
            method: 'GET',
            credentials: 'include',
          });
          if (response.status === 401 ){
            navigate("/login");
          }
          const data = await response.json();
          if (data != null) {
            setCdns(data); // Set the users data
          }
  
        } catch (error) {
          console.error('Error fetching cdns:', error);
        }
      };
  
      fetchUsers();
    }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <div className="p-4 sm:ml-4">
          <div className="container mx-auto p-4">
            <h3 className="font-bold mb-4">CloudFlares</h3>
            <CFTable data={cfs}/>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default CFLayout;

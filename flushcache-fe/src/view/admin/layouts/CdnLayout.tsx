import React, { useEffect, useState } from 'react';
import { Button, Spinner } from "flowbite-react";
import { Box } from '@mui/material';
import Sidebar from '../components/SideBar';
import CdnTable from '../modules/cdns/CdnTable';
import CreateCdn from '../modules/cdns/CreateCdn';
import { useNavigate } from 'react-router-dom';

interface Cdn {
  cdn_name: string;
  cdn_resourceid: number;
  cdn_domain: string;
}
// test
// const Cdns_Sample: Cdn[] = [
//   {cdn_name: "cdn.vn", cdn_resourceid: 333, cdn_domain: "vtv"},
//   {cdn_name: "cdn.com", cdn_resourceid: 222, cdn_domain: "vtv"},
//   {cdn_name: "cdn.org", cdn_resourceid: 565, cdn_domain: "vtv"},
// ]
interface User {
  email: string;
  role: string;
}

const CdnLayout: React.FC = () => {
  const [cdns, setCdns] = useState<Cdn[]>([]);
  const user: User = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
  const navigate = useNavigate();

  // const apiBaseUrl = process.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Fetch data from the API
    const fetchCdns = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getallcdns', {
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

    fetchCdns();
  }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <div className="p-4 sm:ml-4">
          <div className="container mx-auto p-4 space-y-8">
            <section>
            <h3 className="font-bold mb-4">Cdns</h3>
            <CdnTable data={cdns}/>
            </section>
            <CreateCdn/>
          </div>
        </div>
      </Box> 
    </Box>
  );
};

export default CdnLayout;

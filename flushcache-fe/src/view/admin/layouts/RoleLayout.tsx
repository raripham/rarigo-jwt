import React, { useEffect, useState } from 'react';
import { Button } from "flowbite-react";
import { Box } from '@mui/material';
import Sidebar from '../components/SideBar';
import UserTable from '../modules/users/UserTable';
import CreateUser from '../modules/users/CreateUser';
import RoleTable from '../modules/roles/RoleTable';
import { useNavigate } from 'react-router-dom';


interface User {
  email: string;
  role: string;
}

interface Cf {
  cf_domain: string;
}

interface Cdn {
  cdn_name: string;
  cdn_resourceid: number
}

interface CfRole {
    email: string;
    cf_domain: string;
}

interface CdnRole {
    email: string;
    cdn_name: string;
    cdn_resourceid: number
}

// const users: User[] = [
//   {email: "user@mail.com", role: ""},
//   {email: "admin@ftech.ai", role: "Admin"},
//   {email: "trongpt@ftech.ai", role: "Admin"}]

// const cfs: Cf[] = [
//   {cf_domain: "ventory.gg"},
//   {cf_domain: "tocen.co"}]

// const cdns: Cdn[] = [
//   {cdn_name: "cdn.vn", cdn_resourceid: 333},
//   {cdn_name: "cdn.com", cdn_resourceid: 222},
//   {cdn_name: "cdn.org", cdn_resourceid: 565},
// ]


// const cfRoles: CfRole[] = [
//     {email: "user@mail.com", cf_domain: "ventory.gg"},
//     {email: "admin@ftech.ai", cf_domain: "ventory.gg"},
//     {email: "admin@ftech.ai", cf_domain: "tocen.co"},
//     {email: "trongpt@ftech.ai", cf_domain: "ventory.gg"},
//     {email: "trongpt@ftech.ai", cf_domain: "tocen.co"},
// ]

// const cdnRoles: CdnRole[] = [
//     {email: "user@mail.com", cdn_name: "cdn.vn", cdn_resourceid: 333},
//     {email: "admin@ftech.ai", cdn_name: "cdn.vn", cdn_resourceid: 333},
//     {email: "admin@ftech.ai", cdn_name: "cdn.vn", cdn_resourceid: 222},
//     {email: "admin@ftech.ai", cdn_name: "cdn.vn", cdn_resourceid: 565},
//     {email: "trongpt@ftech.ai", cdn_name: "cdn.vn", cdn_resourceid: 333},
//     {email: "trongpt@ftech.ai", cdn_name: "cdn.vn", cdn_resourceid: 222},
//     {email: "trongpt@ftech.ai", cdn_name: "cdn.vn", cdn_resourceid: 565},
// ]

const RoleLayout: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [cfs, setCFs] = useState<Cf[]>([]);
  const [cfRoles, setCfRoles] = useState<CfRole[]>([]);
  const [cdns, setCdns] = useState<Cdn[]>([]);
  const [cdnRoles, setCdnRoles] = useState<CdnRole[]>([]);

  const navigate = useNavigate();
  

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status === 401) {
          navigate('/login')
        }
        const data = await response.json();
        if (data != null) {
          setUsers(data); // Set the Users data
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const fetchCdns = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getallcdns', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status === 401) {
          navigate('/login')
        }
        const data = await response.json();
        if (data != null) {
          setCdns(data); // Set the Cdns data
        }
      } catch (error) {
        console.error('Error fetching cdns:', error);
      }
    };
    const fetchCdnRoles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cdnroles', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status === 401) {
          navigate('/login')
        }
        const data = await response.json();
        if (data != null) {
          setCdnRoles(data); // Set the Cdns data
        }
      } catch (error) {
        console.error('Error fetching cdns:', error);
      }
    };
    const fetchCfs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getallcfs', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status === 401) {
          navigate('/login')
        }
        const data = await response.json();
        if (data != null) {
          setCFs(data); // Set the Cdns data
        }
      } catch (error) {
        console.error('Error fetching cdns:', error);
      }
    };
    const fetchCfRoles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cfroles', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (data != null) {
          setCfRoles(data); // Set the CfRoles data
        }

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
    fetchCdns();
    fetchCdnRoles();
    fetchCfs();
    fetchCfRoles();
  }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <div className="p-4 sm:ml-4">
          <div className="container mx-auto p-4">
            <RoleTable users={users} cfs={cfs} cdns={cdns} cfrole={cfRoles} cdnrole={cdnRoles}/>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default RoleLayout;

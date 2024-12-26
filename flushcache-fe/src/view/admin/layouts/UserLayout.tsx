import React, { useEffect, useState } from 'react';
import { Button } from "flowbite-react";
import { Box } from '@mui/material';
import Sidebar from '../components/SideBar';
import UserTable from '../modules/users/UserTable';
import CreateUser from '../modules/users/CreateUser';
import AlertComponent from '../components/Alert';
import { useNavigate } from 'react-router-dom';


interface User {
  email: string;
  role: string;
}

const UserLayout: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  
    // const apiBaseUrl = process.env.VITE_API_BASE_URL;
  
    useEffect(() => {
      // Fetch data from the API
      const fetchUsers = async () => {
        try {
          const user: User = JSON.parse(sessionStorage.getItem('userInfo') || '{}');
          // console.log("user: ", user, user?.email)
          const response = await fetch('http://localhost:8000/api/users?' + new URLSearchParams({
            email: user?.email,
          }), {
            method: 'GET',
            credentials: 'include',
          });
          if (response.status === 401) {
            navigate('/login')
          }
          const data = await response.json();
          if (data != null) {
            // console.log(data)
            setUsers(data); // Set the users data
          }
  
        } catch (error) {
          console.error('Error fetching users:', error);
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
            <UserTable data={users}/>
            <CreateUser/>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default UserLayout;

import React from 'react';
import { Button } from "flowbite-react";
import { Box } from '@mui/material';
import Sidebar from '../components/SideBar';
import UserTable from '../modules/users/UserTable';
import CreateUser from '../modules/users/CreateUser';


interface User {
  email: string;
  role: string;
}

const users: User[] = [
  {email: "user@mail.com", role: ""},
  {email: "admin@ftech.ai", role: "Admin"},
  {email: "trongpt@ftech.ai", role: "Admin"}]

const UserLayout: React.FC = () => {
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


"use client";

import {  Sidebar } from "flowbite-react";
import { FaGlobe, FaCloud, FaSignOutAlt  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from "../../auth/AuthContext";

export function SideBar() {
  const navigate = useNavigate();
  const { userC, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        credentials: 'include', // Ensure the cookie is included
      });
    } catch (error) {
      console.error('Error fetching logout:', error);
    }
    
    sessionStorage.removeItem('userInfo');
    

    navigate('/login'); // Redirect to login
  };
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Logo href="#" img="https://flowbite.com/docs/images/logo.svg" imgAlt="FlushCache">
        FlushCache
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/ui/cfs" icon={FaCloud}>
            CloudFlare
          </Sidebar.Item>
          <Sidebar.Item href="/ui/cdns" icon={FaGlobe}>
            CDN
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={FaSignOutAlt} onClick={handleLogout} >
            Log out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}


export default SideBar;
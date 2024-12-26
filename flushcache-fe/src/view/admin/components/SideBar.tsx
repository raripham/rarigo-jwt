
"use client";

import { Sidebar } from "flowbite-react";
import { FaUserFriends, FaGlobe, FaCloud, FaUsersCog, FaSignOutAlt  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export function SideBar() {
  const navigate = useNavigate();
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
    <div className="sticky top-0 h-screen">
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Logo href="/admin" img="https://flowbite.com/docs/images/logo.svg" imgAlt="FlushCache">
        FlushCache
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin/cfs" icon={FaCloud}>
            CloudFlare
          </Sidebar.Item>
          <Sidebar.Item href="/admin/cdns" icon={FaGlobe}>
            CDN
          </Sidebar.Item>
          <Sidebar.Item href="/admin/users" icon={FaUserFriends} label="Admin" labelColor="dark">
            User
          </Sidebar.Item>
          <Sidebar.Item href="/admin/roles" icon={FaUsersCog} label="Admin" labelColor="dark">
            Roles
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaSignOutAlt} onClick={handleLogout} >
            Log out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
}


export default SideBar;
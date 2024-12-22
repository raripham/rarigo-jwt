
"use client";

import { Sidebar } from "flowbite-react";
import { FaUserFriends, FaGlobe, FaCloud, FaUsersCog, FaSignOutAlt  } from "react-icons/fa";

export function SideBar() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Logo href="#" img="https://flowbite.com/docs/images/logo.svg" imgAlt="FlushCache">
        FlushCache
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={FaCloud}>
            CloudFlare
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaGlobe}>
            CDN
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaUserFriends}>
            User
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaUsersCog} label="Admin" labelColor="dark">
            Roles
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaSignOutAlt}>
            Log out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}


export default SideBar;

"use client";

import { Table, Button, Modal, TextInput, Label, Select, Checkbox, ToggleSwitch } from "flowbite-react";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

interface RoleProps {
  users: Array<{
    email: string;
  }>;
  cdns: Array<{
    cdn_name: string;
    cdn_resourceid: number
  }>;
}

interface User {
  email: string;
  role: string;
}

interface Cdn {
  cdn_name: string;
  cdn_resourceid: number
}


export function CreateCdnRole({cdns, users}: RoleProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [user, setUser] = useState<string | null>(null);
  const [cdn_name, setCdnName] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsOpen(true); // Open the form modal
  };

  const closeModal = () => {
    setIsOpen(false);
    setUser('');
    setCdnName('');
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    
    // const data = {
    //   user: user,
    //   cdn_name: cdnName
    // }
    // console.log(data);
    try {
      const response = await fetch('http://localhost:8000/api/cdnroles', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user,
          cdn_name: cdn_name,
        })
      });    
    } catch (error) {
      console.error('Error create user:', error);
    }
    closeModal(); // Close the modal after submission
  };
  return (
    <div className="overflow-x-auto">
      <Button size="sm" onClick={() => handleButtonClick()}>Create Cdn Role</Button>
      {/* Modal Form */}
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>Create Cdn Role</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="users" value="User" />
              </div>
              <Select id="users" onChange={(e) => setUser(e.target.value)} required>
                <option value=""></option>
                {users.map((item) => (
                <option>{item.email}</option>
                ))}
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="cdnNames" value="CDN Name" />
              </div>
              <Select id="cdnNames" onChange={(e) => setCdnName(e.target.value)} required>
                <option value=""></option>
                {cdns.map((item) => (
                <option>{item.cdn_name}</option>
                ))}
              </Select>
            </div>
            <div className="flex justify-end gap-4">
              <Button color="gray" onClick={closeModal} type="button">
                Cancel
              </Button>
              <Button type="submit">Allow</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateCdnRole;
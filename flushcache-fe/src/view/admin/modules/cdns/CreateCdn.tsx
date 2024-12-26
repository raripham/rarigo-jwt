
"use client";

import { Table, Button, Modal, TextInput, Label, Select, Checkbox, ToggleSwitch } from "flowbite-react";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


export function CreateCdn() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [address, setAddress] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cdnName, setCdnName] = useState<string>('');
  const [resourceID, setResourceID] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsOpen(true); // Open the form modal
  };

  const closeModal = () => {
    setIsOpen(false);
    setUser('');
    setPassword('');

  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const data = {
      address: address,
      resource_id: resourceID,
      user: user,
      password: password
    }
    console.log(data);
    try {
      const response = await fetch('http://localhost:8000/api/cdns', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cdn_name: cdnName,
          cdn_resourceid: resourceID,
          cdn_domain: address,
          cdn_user: user,
          cdn_token: password,
        })
      });
      if (response.status === 401 ){
        navigate("/login");
      }   
    } catch (error) {
      console.error('Error create user:', error);
    }
    
    closeModal(); // Close the modal after submission
  };
  return (
    <div className="overflow-x-auto">
      <Button size="sm" onClick={() => handleButtonClick()}>Add CDN</Button>
      {/* Modal Form */}
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>Add CDN</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div>
                <Label htmlFor="address" value="Address" />
                <TextInput id="address" value={address} type="text" onChange={(e) => setAddress(e.target.value)} placeholder="cms-cloud.vtvlive.vn" required />
            </div>
            <div>
              <Label htmlFor="user" value="User" />
              <TextInput id="user" value={user} type="text" onChange={(e) => setUser(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="cdnName" value="Name" />
              <TextInput id="cdnName" value={cdnName} type="text" onChange={(e) => setCdnName(e.target.value)} placeholder="funzy.vn" required />
            </div>
            <div>
              <Label htmlFor="resourceid" value="Resource ID" />
              <TextInput id="resourceid" value={resourceID ?? ""} type="number" onChange={(e) => setResourceID(parseFloat(e.target.value))} required />
            </div>
            <div className="flex justify-end gap-4">
              <Button color="gray" onClick={closeModal} type="button">
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateCdn;
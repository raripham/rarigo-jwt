
"use client";

import { Table, Button, Modal, TextInput, Label, Select, Checkbox, ToggleSwitch } from "flowbite-react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

interface RoleProps {
  users: Array<{
    email: string;
  }>;
  cfs: Array<{
    cf_domain: string;
  }>;
}

export function CreateCfRole({ users, cfs }: RoleProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [user, setUser] = useState<string | null>(null);
  const [cf_domain, setCfDomain] = useState<string | null>(null);

  const handleButtonClick = () => {
    setIsOpen(true); // Open the form modal
  };

  const closeModal = () => {
    setIsOpen(false);
    setUser('');
    setCfDomain('');
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    // const data = {
    //   user: user,
    //   cf_domain: cf_domain
    // }
    // console.log(data);
    try {
      const response = await fetch('http://localhost:8000/api/cfroles', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user,
          cf_domain: cf_domain,
        })
      });    
    } catch (error) {
      console.error('Error create user:', error);
    }
    closeModal(); // Close the modal after submission
  };
  return (
    <div className="overflow-x-auto">
      <Button size="sm" onClick={() => handleButtonClick()}>Create CF Role</Button>
      {/* Modal Form */}
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>Create CF Role</Modal.Header>
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
                <Label htmlFor="cfdomains" value="CF Domain" />
              </div>
              <Select id="cfdomains" onChange={(e) => setCfDomain(e.target.value)} required>
                <option value=""></option>
                {cfs.map((item) => (
                <option>{item.cf_domain}</option>
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

export default CreateCfRole;
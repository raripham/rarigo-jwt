
"use client";

import { Table, Button, Modal, TextInput, Label, Select, Checkbox, ToggleSwitch } from "flowbite-react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

interface RoleProps {
  users: Array<{
    email: string;
  }>;
  cdns: Array<{
    cdn_name: string;
    cdn_resourceid: number
  }>;
}


export function CreateCdnRole({ users, cdns }: RoleProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [user, setUser] = useState<string | null>(null);
  const [cdnName, setCdnName] = useState<string | null>(null);

  const handleButtonClick = () => {
    setIsOpen(true); // Open the form modal
  };

  const closeModal = () => {
    setIsOpen(false);
    setUser('');
    setCdnName('');
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const data = {
      user: user,
      cdn_name: cdnName
    }
    console.log(data);
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
              <Select id="users" required>
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
              <Select id="cfdomains" required>
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
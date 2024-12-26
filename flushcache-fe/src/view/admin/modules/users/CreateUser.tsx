
"use client";

import { Table, Button, Modal, TextInput, Label, Select, Checkbox, ToggleSwitch } from "flowbite-react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";



export function CreateUser() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAmdin, setAdmin] = useState(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleButtonClick = () => {
    setIsOpen(true); // Open the form modal
  };

  const closeModal = () => {
    setIsOpen(false);
    setEmail('');
    setPassword('');
    setAdmin(false)
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (isAmdin === true)  {
      setRole("Admin");
    }
    // const data = {
    //   email: email,
    //   password: password,
    //   role: role
    // }
    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: role
        })
      });    
    } catch (error) {
      console.error('Error create user:', error);
    }

    closeModal(); // Close the modal after submission
  };
  return (
    <div className="overflow-x-auto">
      <Button size="sm" onClick={() => handleButtonClick()}>Create User</Button>
      {/* Modal Form */}
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>Create User</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput id="email" value={email} type="text" onChange={(e) => setEmail(e.target.value)} placeholder="name@ftech.ai" required />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} required
              />
            </div>
            <div className="flex items-start gap-4">
                <ToggleSwitch checked={isAmdin} label="Admin" onChange={setAdmin} />
            </div>
            <div className="flex justify-end gap-4">
              <Button color="gray" onClick={closeModal} type="button">
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateUser;
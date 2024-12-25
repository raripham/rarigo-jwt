
"use client";

import { Table, Button, Modal, TextInput, Label } from "flowbite-react";
import React, { useState } from 'react';

interface UserTableProps {
  data: Array<{
    email: string;
    role: string;
  }>;
}

export function UserTable({ data }: UserTableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleButtonClick = () => {
    setIsOpen(true); // Open the form modal
  };

  const closeModal = () => {
    setIsOpen(false);
    setEmail('');
    setPassword('');
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const data = {
      email: email,
      password: password
    }
    console.log(data);
    closeModal(); // Close the modal after submission
  };
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.role}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default UserTable;

import { Table, Button, Modal, Label, TextInput } from "flowbite-react";

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface CFTableProps {
  data: Array<{
    cf_domain: string;
  }>;
}
interface User {
  email: string;
  role: string;
}

export function CFTable({ data }: CFTableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<{ cf_domain: string } | null>(null);
  const user: User = JSON.parse(sessionStorage.getItem('userInfo') || '{}');

  const navigate = useNavigate();

  const handleButtonClick = (row: { cf_domain: string; }) => {
    setSelectedRow(row);
    setIsOpen(true); // Open the form modal
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRow(null);
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const data = {
      email: user.email,
      role: user.role,
      domain: selectedRow?.cf_domain,
    }
    console.log(data);
    try {
      const response = await fetch('http://localhost:8000/api/cfs/purge', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          role: user.role,
          domain: selectedRow?.cf_domain,
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
      <Table>
        <Table.Head>
          <Table.HeadCell>CF Domain</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{item.cf_domain}</Table.Cell>
              <Button size="xs" onClick={() => handleButtonClick(item)}>Purge</Button>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* Modal Form */}
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>Purge Cache Cloudflare</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="cf_domain" value="CF Domain" />
              <TextInput id="cf_domain" value={selectedRow?.cf_domain || ''} readOnly />
            </div>
            <div className="flex justify-end gap-4">
              <Button color="gray" onClick={closeModal} type="button">
                Cancel
              </Button>
              <Button type="submit">Purge</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CFTable;
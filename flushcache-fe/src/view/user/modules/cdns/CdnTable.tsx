
"use client";

import { Table, Button, Modal, TextInput, Label } from "flowbite-react";
import React, { useState } from 'react';

interface CdnTableProps {
  data: Array<{
    cdn_name: string;
    cdn_resourceid: number;
    cdn_domain: string;
  }>;
}

export function CdnTable({ data }: CdnTableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<{ cdn_resourceid: number } | null>(null);
  const [pathInput, setPathInput] = useState<string>('');

  const handleButtonClick = (row: { cdn_resourceid: number; }) => {
    setSelectedRow(row);
    setIsOpen(true); // Open the form modal
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRow(null);
    setPathInput('');
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const data = {
      resource_id: selectedRow?.cdn_resourceid,
      purge_paths: pathInput
    }
    console.log(data);
    closeModal(); // Close the modal after submission
  };
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>CDN Name</Table.HeadCell>
          <Table.HeadCell>Resource ID</Table.HeadCell>
          <Table.HeadCell>Domain</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {item.cdn_name}
              </Table.Cell>
              <Table.Cell>{item.cdn_resourceid}</Table.Cell>
              <Table.Cell>{item.cdn_domain}</Table.Cell>
              <Button size="xs" onClick={() => handleButtonClick(item)}>Purge</Button>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* Modal Form */}
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>Purge Cache CDN</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="cdn_resourceid" value="Resource ID" />
              <TextInput id="cdn_resourceid" value={selectedRow?.cdn_resourceid || ''} readOnly />
            </div>
            <div>
              <Label htmlFor="purge_paths" value="Purge Paths" />
              <TextInput id="purge_paths" value={pathInput} type="text" onChange={(e) => setPathInput(e.target.value)} placeholder="folder/file or file" required
              />
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

export default CdnTable;
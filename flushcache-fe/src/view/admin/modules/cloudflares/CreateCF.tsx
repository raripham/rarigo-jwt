
import { Table, Button, Modal, TextInput, Label, Select, Checkbox, ToggleSwitch } from "flowbite-react";
import React, { useState } from 'react';


export function CreateCF() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [endpoint, setEndpoint] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [zoneid, setZoneID] = useState<string>('');

  const handleButtonClick = () => {
    setIsOpen(true); // Open the form modal
  };

  const closeModal = () => {
    setIsOpen(false);
    setEndpoint('');
    setToken('');
    setDomain('');
    setZoneID('');
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const data = {
      endpoint: endpoint,
      token: token,
      domain: domain,
      zoneid: zoneid,
    }
    console.log(data);
    closeModal(); // Close the modal after submission
  };
  return (
    <div className="overflow-x-auto">
      <Button size="sm" onClick={() => handleButtonClick()}>Add CF</Button>
      {/* Modal Form */}
      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>Add CF</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="endpoint" value="Endpoint" />
              <TextInput id="endpoint" value={endpoint} type="text" onChange={(e) => setEndpoint(e.target.value)} placeholder="api.cloudflare.com" required />
            </div>
            <div>
              <Label htmlFor="token" value="Token" />
              <TextInput id="token" value={token} type="password" onChange={(e) => setToken(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="domain" value="Domain" />
              <TextInput id="domain" value={domain} type="text" onChange={(e) => setDomain(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="zoneid" value="Zone ID" />
              <TextInput id="zoneid" value={zoneid} type="text" onChange={(e) => setZoneID(e.target.value)} required />
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

export default CreateCF;
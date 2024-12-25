
"use client";

import { Table, Button, Modal, TextInput, Label } from "flowbite-react";
import CreateCdnRole from "./CreateCdnRole";
import CreateCfRole from "./CreateCfRole";
import React, { useState } from 'react';

interface RoleProps {
  cfrole: Array<{
    email: string;
    cf_domain: string;
  }>;
  cdnrole: Array<{
    email: string;
    cdn_name: string;
    cdn_resourceid: number
  }>;
  users: Array<{
    email: string;
  }>;
  cfs: Array<{
    cf_domain: string;
  }>;
  cdns: Array<{
    cdn_name: string;
    cdn_resourceid: number
  }>;
}

export function RoleTable({ users, cfs, cdns, cfrole, cdnrole }: RoleProps) {
  return (
    <div className="space-y-8">
      <section>
      <h3 className="font-bold mb-4">CloudFlare Roles</h3>
      <Table>
        <Table.Head>
          <Table.HeadCell>User</Table.HeadCell>
          <Table.HeadCell>Domain</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {cfrole.map((item) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.cf_domain}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      </section>
      <CreateCfRole cfs={cfs} users={users}/>
      
      <section>
      <h3 className="font-bold mb-4">CDN Roles</h3>
      <Table>
        <Table.Head>
          <Table.HeadCell>User</Table.HeadCell>
          <Table.HeadCell>CDN Name</Table.HeadCell>
          <Table.HeadCell>Resource ID</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {cdnrole.map((item) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.cdn_name}</Table.Cell>
              <Table.Cell>{item.cdn_resourceid}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      </section>
      <CreateCdnRole users={users} cdns={cdns}/>
    </div>
  );
}

export default RoleTable;
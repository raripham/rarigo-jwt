
"use client";

import { Table } from "flowbite-react";

interface UserTableProps {
  data: Array<{
    email: string;
    role: string;
  }>;
}

export function UserTable({ data }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item) => (
            <Table.Row key={item.email} className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
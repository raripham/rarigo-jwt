
"use client";

import { Table, Button } from "flowbite-react";

export function CFTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell className="text-gray-900 dark:text-white">Domain</Table.HeadCell>
          <Table.HeadCell className="text-gray-900 dark:text-white">Action</Table.HeadCell>
          {/* <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell> */}
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'raripahm.com'}
            </Table.Cell>
            <Table.Cell>
              {/* <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a> */}
              <Button size="xs">Purge</Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">raripahm.vn</Table.Cell>
            <Table.Cell>
              {/* <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a> */}
              <Button size="xs">Purge</Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
            <Table.Cell>
              {/* <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a> */}
              <Button size="xs">Purge</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default CFTable;
import { Card } from '@chakra-ui/react';
import BreadCrumb from '@dumps/components/breadCrumb';
import { DataTable } from '@dumps/components/dataTable';
import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

function Dashboard() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const col = [
    {
      header: 'S.N',
      accessorFn: (_cell: unknown, index: number) => {
        return index + 1;
      },
    },
    {
      header: 'Name',
      accessorKey: 'first_name1',
      accessorFn: (_cell: unknown, index: number) => {
        return index + 1;
      },
    },
    {
      header: 'Name',
      accessorKey: 'first_name2',
      accessorFn: (_cell: unknown, index: unknown) => {
        return index;
      },
    },
    {
      header: 'Name',
      accessorKey: 'first_name3',
      accessorFn: (_cell: unknown, index: unknown) => {
        return index;
      },
    },
  ];

  return (
    <>
      <BreadCrumb items={[{ name: 'Dashboard', route: '/admin', isCurrentPage: true }]} />

      <Card className="base-card">
        <DataTable
          columns={col}
          data={[]}
          pagination={{
            manual: true,
            pageParams: { pageIndex, pageSize },
            pageCount: 10,
            onChangePagination: setPagination,
          }}
        />
      </Card>
    </>
  );
}

export default Dashboard;

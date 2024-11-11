import { Box, Card } from '@chakra-ui/react';
import { BreadCrumb } from '@dumps/components/breadCrumb';
import { DataTable } from '@dumps/components/dataTable';
import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

const Bundles = () => {
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
      <BreadCrumb
        items={[{ name: 'Bundles', route: '/', isCurrentPage: true }]}
      />

      <Card className="base-card">
        <Box position="relative">
          {/* {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
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
          )} */}
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
        </Box>
      </Card>
    </>
  );
};

export default Bundles;

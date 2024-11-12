import { Box, Card } from '@chakra-ui/react';
import { useGetAllBundles } from '@dumps/api-hooks/bundles/useGetAllBundles';
import { BreadCrumb } from '@dumps/components/breadCrumb';
import { DataTable } from '@dumps/components/dataTable';
import { ActionButtons } from '@dumps/components/dataTableActions';
import LoadingSpinner from '@dumps/components/loadingSpinner';
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
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Desc',
      accessorKey: 'description',
    },
    {
      header: 'Price',
      accessorKey: 'discountedPrice',
      accessorFn: (info: any) => `$${info.discountedPrice}`,
    },
    {
      header: 'Actions',
      cell: ({ row }: { row: any }) => {
        return (
          <ActionButtons
            row={row.original}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        );
      },
    },
  ];

  const { data, isLoading } = useGetAllBundles();

  return (
    <>
      <BreadCrumb
        items={[{ name: 'Bundles', route: '/', isCurrentPage: true }]}
      />

      <Card className="base-card">
        <Box position="relative">
          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <DataTable
              columns={col}
              data={data ?? []}
              pagination={{
                manual: true,
                pageParams: { pageIndex, pageSize },
                pageCount: 10,
                onChangePagination: setPagination,
              }}
            />
          )}
        </Box>
      </Card>
    </>
  );
};

export default Bundles;

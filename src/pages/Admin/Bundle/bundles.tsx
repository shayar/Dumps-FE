import { Box, Button, Card } from '@chakra-ui/react';
import { useGetAllBundles } from '@dumps/api-hooks/bundles/useGetAllBundles';
import { BreadCrumb } from '@dumps/components/breadCrumb';
import { DataTable } from '@dumps/components/dataTable';
import { ActionButtons } from '@dumps/components/dataTableActions';
import LoadingSpinner from '@dumps/components/loadingSpinner';
import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Bundles = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllBundles();

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
            onEdit={(row: any) => {
              navigate(`manage/${row.id}`);
            }}
            onDelete={() => {}}
          />
        );
      },
    },
  ];

  return (
    <>
      <BreadCrumb
        items={[{ name: 'Bundles', route: '/', isCurrentPage: true }]}
      />

      <Card className="base-card">
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button
            onClick={() => {
              navigate('manage');
            }}
          >
            Add New Bundle
          </Button>
        </Box>
      </Card>

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

import { Box, Button, Card } from '@chakra-ui/react';
import { useGetAllProducts } from '@dumps/api-hooks/product/useGetAllProducts';
import { BreadCrumb } from '@dumps/components/breadCrumb';
import { DataTable } from '@dumps/components/dataTable';
import LoadingSpinner from '@dumps/components/loadingSpinner';
import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionButtons } from '@dumps/components/dataTableActions';
import { useDeleteProductById } from '@dumps/api-hooks/product/useDeleteProductById';
import { DumpDetails } from '@dumps/api-schemas/dump';

const Dump = () => {
  const navigate = useNavigate();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
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
      header: 'Code Title',
      accessorKey: 'codeTitle',
    },
    {
      header: 'Desc',
      accessorKey: 'description',
    },
    {
      header: 'Price',
      accessorKey: 'price',
      accessorFn: (info: DumpDetails) => `$${info.price}`,
    },
    {
      header: 'Discount',
      accessorKey: 'discount',
      accessorFn: (_cell: DumpDetails) => {
        return `${_cell.discount}%`;
      },
    },
    {
      header: 'Actions',
      cell: ({ row }: { row: any }) => { // eslint-disable-line
        return (
          <ActionButtons
            row={row.original}
            onEdit={(row: any) => { // eslint-disable-line
              navigate(`manage/${row.id}`);
            }}
            onDelete={(row: any) => { // eslint-disable-line
              deleteProduct(row.id);
            }}
          />
        );
      },
    },
  ];

  const { data, isLoading } = useGetAllProducts(pageIndex + 1, pageSize);
  const { mutate: deleteProduct } = useDeleteProductById();

  return (
    <>
      <BreadCrumb items={[{ name: 'Dump', route: '/', isCurrentPage: true }]} />

      <Card className="base-card">
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button
            onClick={() => {
              navigate('manage');
            }}
          >
            Add New Dump
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
              data={data?.data ?? []}
              pagination={{
                manual: true,
                pageParams: { pageIndex, pageSize },
                pageCount: data?.totalPages,
                onChangePagination: setPagination,
              }}
            />
          )}
        </Box>
      </Card>
    </>
  );
};

export default Dump;

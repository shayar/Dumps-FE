import { Box, Button, Card } from '@chakra-ui/react';
import { useGetAllProducts } from '@dumps/api-hooks/product/useGetAllProducts';
import { BreadCrumb } from '@dumps/components/breadCrumb';
import { DataTable } from '@dumps/components/dataTable';
import LoadingSpinner from '@dumps/components/loadingSpinner';
import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dump = () => {
  const navigate = useNavigate();

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
      accessorKey: 'price',
      accessorFn: (info: any) => `$${info.price}`,
    },
    {
      header: 'Discount',
      accessorKey: 'discount',
      accessorFn: (_cell: any) => {
        return `${_cell.discount}%`;
      },
    },
  ];

  const { data, isLoading } = useGetAllProducts();

  return (
    <>
      <BreadCrumb items={[]} title={{ name: 'Dump', route: '/' }} />

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

export default Dump;

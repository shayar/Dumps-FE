import { Box, Button, Card } from '@chakra-ui/react';
import { useGetAllProducts } from '@dumps/api-hooks/product/useGetAllProducts';
import { BreadCrumb } from '@dumps/components/breadCrumb';
import { DataTable } from '@dumps/components/dataTable';
import LoadingSpinner from '@dumps/components/loadingSpinner';
import { PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionButtons } from '@dumps/components/dataTableActions';
import { useDeleteProductById } from '@dumps/api-hooks/product/useDeleteProductById';
import { DumpDetails } from '@dumps/api-schemas/dump';
import { toastSuccess } from '@dumps/service/service-toast';
import { handleApiError } from '@dumps/service/service-utils';

const Dump = () => {
  const navigate = useNavigate();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, error, isLoading, isSuccess, isError } = useGetAllProducts(pageIndex + 1, pageSize);
  const { mutateAsync: deleteProduct } = useDeleteProductById();

  useEffect(() => {
    if (isSuccess) {
      toastSuccess(data.message);
    }
    if (isError) {
      handleApiError(error);
    }
  }, [isSuccess, isError]);

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
      // eslint-disable-next-line
      cell: ({ row }: { row: any }) => {
        return (
          <ActionButtons
            row={row.original}
            // eslint-disable-next-line
            onEdit={(row: any) => {
              navigate(`manage/${row.id}`);
            }}
            // eslint-disable-next-line
            onDelete={async (row: any) => {
              try {
                const res = await deleteProduct(row.id);
                if (res) {
                  toastSuccess(res.message);
                }
              } catch (error) {
                handleApiError(error);
              }
            }}
          />
        );
      },
    },
  ];

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

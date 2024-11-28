import { Box, Button, Card } from '@chakra-ui/react';
import useDeleteBundleById from '@dumps/api-hooks/bundles/useDeleteBundleById';
import useGetAllBundles from '@dumps/api-hooks/bundles/useGetAllBundles';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import BreadCrumb from '@dumps/components/breadCrumb';
import { DataTable } from '@dumps/components/dataTable';
import ActionButtons from '@dumps/components/dataTableActions';
import LoadingSpinner from '@dumps/components/loadingSpinner';
import { toastSuccess } from '@dumps/service/service-toast';
import handleApiError from '@dumps/service/service-utils';
import { PaginationState, Row } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Bundles() {
  const navigate = useNavigate();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isLoading, isSuccess, error, isError } = useGetAllBundles(pageIndex + 1, pageSize);

  const { mutateAsync: deleteBundle } = useDeleteBundleById();

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
      header: 'Desc',
      accessorKey: 'description',
    },
    {
      header: 'Price',
      accessorKey: 'discountedPrice',
      accessorFn: (info: BundleResponse) => `$${info.discountedPrice}`,
    },
    {
      header: 'Actions',
      // eslint-disable-next-line
      cell: ({ row }: { row: Row<any> }) => {
        return (
          <ActionButtons
            row={row.original}
            // eslint-disable-next-line
            onEdit={(row: Row<any>) => {
              navigate(`manage/${row.id}`);
            }}
            // eslint-disable-next-line
            onDelete={async (row: any) => {
              try {
                const res = await deleteBundle(row.id);
                if (res) {
                  toastSuccess(res.message);
                }
              } catch (err) {
                handleApiError(err);
              }
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      <BreadCrumb items={[{ name: 'Bundles', route: '/', isCurrentPage: true }]} />

      <Card className="base-card">
        <Box display="flex" justifyContent="flex-end">
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
            <LoadingSpinner />
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
}
export default Bundles;

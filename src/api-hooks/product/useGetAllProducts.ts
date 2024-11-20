import { APIResponse } from '@dumps/api-schemas/APIResponse';
import { DumpDetails } from '@dumps/api-schemas/dump';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const getAllProductsRequest = async (page: number, search?: string) => {
  const params = {
    page,
    ...(search && { search }), // Only add 'search' if it's defined
  };

  return await httpClient.get<APIResponse<DumpDetails[]>>(api.product.getAll, {
    params,
  });
};

const useGetAllProducts = (page: number, search?: string) => {
  const query = useQuery({
    queryKey: ['products', page, search],
    queryFn: () => getAllProductsRequest(page, search),
  });

  // TODO: this should be handele in the componenet
  useEffect(() => {
    if (query.isError) {
      toastFail('Failed to Load Dumps.');
      console.log(query.error);
    }

    if (query.isSuccess && query.data?.message) {
      toastSuccess(query.data.message);
    }
  }, [query.isError, query.isSuccess, query.data?.message]);

  return query;
};
export { useGetAllProducts };

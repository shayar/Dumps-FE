import { APIResponse } from '@dumps/api-schemas/APIResponse';
import { DumpDetails } from '@dumps/api-schemas/dump';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useQuery } from '@tanstack/react-query';

const getAllProductsRequest = async (
  pageNumber: number,
  pageSize: number,
  sort?: string,
  search?: string,
) => {
  const params = {
    page: pageNumber,
    pageSize,
    ...(sort && { sort }),
    ...(search && { search }),
  };

  return await httpClient.get<APIResponse<DumpDetails[]>>(api.product.getAll, {
    params,
  });
};

const useGetAllProducts = (
  pageNumber: number,
  pageSize: number,
  sort?: string,
  search?: string,
) => {
  return useQuery({
    queryKey: ['products', pageNumber, pageSize, sort, search],
    queryFn: () => getAllProductsRequest(pageNumber, pageSize, sort, search),
  });
};
export { useGetAllProducts };

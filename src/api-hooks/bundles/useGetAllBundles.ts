import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useQuery } from '@tanstack/react-query';

const getAllBundlesRequest = async (
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
  return await httpClient.get<ApiResponse<BundleResponse[]>>(
    api.bundles.getAll,
    { params },
  );
};

const useGetAllBundles = (
  pageNumber: number,
  pageSize: number,
  sort?: string,
  search?: string,
) => {
  return useQuery({
    queryKey: ['bundles', pageNumber, pageSize, sort, search],
    queryFn: () => getAllBundlesRequest(pageNumber, pageSize, sort, search),
  });
};

export { useGetAllBundles };

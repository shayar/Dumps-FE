import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useQuery } from '@tanstack/react-query';

const getAllBundlesRequest = async (page: number, search?: string) => {
  const params = {
    page,
    ...(search && { search }),
  };
  return await httpClient.get(api.bundles.getAll, { params });
};

const useGetAllBundles = (page: number, search?: string) => {
  return useQuery({
    queryKey: ['bundles', page, search],
    queryFn: () => getAllBundlesRequest(page, search),
  });
};

export { useGetAllBundles };

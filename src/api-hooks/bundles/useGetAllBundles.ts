import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useQuery } from 'react-query';

const getAllBundlesRequest = async (page: number, search?: string) => {
  const params = {
    page,
    ...(search && { search }),
  };
  return await httpClient.get(api.bundles.getAll, { params });
};

const useGetAllBundles = (page: number, search?: string) => {
  return useQuery(
    ['bundles', page, search],
    () => getAllBundlesRequest(page, search),
    {
      onSuccess: (response: any) => {
        if (response.message) {
          toastSuccess(response.message);
        }
      },
      onError: (error: any) => {
        toastFail('Failed to Load Dumps.');
        console.log(error);
      },
    },
  );
};

export { useGetAllBundles };

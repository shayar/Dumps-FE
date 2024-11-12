import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useQuery } from 'react-query';

const getAllBundlesRequest = async () => {
  return await httpClient.get(api.bundles.getAll);
};

const useGetAllBundles = () => {
  return useQuery('bundles', getAllBundlesRequest, {
    onSuccess: (response: any) => {
      if (response.message) {
        toastSuccess(response.message);
      }
    },
    onError: (error: any) => {
      toastFail('Failed to Load Dumps.');
      console.log(error);
    },
  });
};

export { useGetAllBundles };

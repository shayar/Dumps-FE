import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useQuery } from 'react-query';

const getAllBundlesRequest = async () => {
  return [
    {
      id: 'w4d72815-76f3-4128-87a9-76fa2456f431',
      title: 'React Bundle',
      description: 'React basic to advance',
      discountedPrice: '10',
      productIds: [
        'e7dc5d9f-81c2-4aa5-8086-adddf3c25b38',
        ' "01d97d27-67e2-43bb-bb22-a14fbd410bba',
        'e4d72815-76f3-4128-87a9-76fa2456f433',
      ],
    },
  ];
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
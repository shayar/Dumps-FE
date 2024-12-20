import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useQuery } from 'react-query';

const getBundleByIdRequest = async (id: string) => {
  return {
    data: {
      id: 'w4d72815-76f3-4128-87a9-76fa2456f431',
      title: 'React basic to advance',
      description: 'This is bundle for react basic to advanced.',
      discountedPrice: '10',
      productIds: [
        'e7dc5d9f-81c2-4aa5-8086-adddf3c25b38',
        ' "01d97d27-67e2-43bb-bb22-a14fbd410bba',
        'e4d72815-76f3-4128-87a9-76fa2456f433',
      ],
    },
  };
  return await httpClient.get(api.bundles.getBundle(id));
};

const useGetBundleById = (id: string) => {
  return useQuery(['bundles', id], () => getBundleByIdRequest(id), {
    enabled: !!id,
    onSuccess: (response: any) => {
      if (response.message) {
        toastSuccess(response.message);
      }
    },
    onError: (error: any) => {
      toastFail('Failed to Load Bundle.');
      console.log(error);
    },
  });
};

export { useGetBundleById };

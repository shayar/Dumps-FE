import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useQuery } from 'react-query';

const getProductByIdRequest = async (id: string) => {
  return await httpClient.get(api.product.getProduct(id));
};

const useGetProductById = (id: string) => {
  return useQuery(['products', id], () => getProductByIdRequest(id), {
    enabled: !!id,
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

export { useGetProductById };

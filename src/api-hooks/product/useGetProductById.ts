import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useQuery } from 'react-query';

const getProductByIdRequest = async (id: string) => {
  await httpClient.get(api.product.getProduct(id));
};

const useGetProductById = (id: string) => {
  return useQuery(['productById', id], () => getProductByIdRequest(id), {
    enabled: !!id,
    onSuccess: (response: any) => {
      console.log(response);
      toastSuccess('Successfully loaded Dumps.');
    },
    onError: (error: any) => {
      toastFail('Failed to Load Dumps.');
      console.log(error);
    },
  });
};

export { useGetProductById };

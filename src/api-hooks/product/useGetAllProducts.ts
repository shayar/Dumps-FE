import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useQuery } from 'react-query';

const getAllProductsRequest = async () => {
  await httpClient.get(api.product.getAll);
};

const useGetAllProducts = () => {
  return useQuery('products', getAllProductsRequest, {
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

export { useGetAllProducts };

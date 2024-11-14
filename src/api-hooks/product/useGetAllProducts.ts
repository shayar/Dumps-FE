import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useQuery } from 'react-query';

const getAllProductsRequest = async (page: number, search?: string) => {
  const params = {
    page,
    ...(search && { search }), // Only add 'search' if it's defined
  };

  return await httpClient.get(api.product.getAll, { params });
};

const useGetAllProducts = (page: number, search?: string) => {
  return useQuery(
    ['products', page, search],
    () => getAllProductsRequest(page, search),
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

export { useGetAllProducts };

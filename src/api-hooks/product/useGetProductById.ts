import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { DumpDetails } from '@dumps/api-schemas/dump';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useQuery } from '@tanstack/react-query';

const getProductByIdRequest = async (id: string) => {
  return await httpClient.get<ApiResponse<DumpDetails>>(api.product.getProduct(id));
};

const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductByIdRequest(id),
    enabled: !!id,
  });
};

export { useGetProductById };

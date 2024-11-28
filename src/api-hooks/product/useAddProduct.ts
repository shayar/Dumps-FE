import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { DumpDetails } from '@dumps/api-schemas/dump';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from '@tanstack/react-query';

const addProductRequest = (data: FormData) => {
  return httpClient.post<ApiResponse<DumpDetails>, FormData>(api.product.addProduct, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const useAddProduct = () => {
  return useMutation({
    mutationFn: addProductRequest,
  });
};

export { useAddProduct };

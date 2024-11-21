import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { DumpDetails } from '@dumps/api-schemas/dump';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from '@tanstack/react-query';

const updateProductRequest = (data: FormData, id: string) => {
  return httpClient.put<ApiResponse<DumpDetails>, FormData>(
    api.product.updateProduct(id),
    data,
  );
};

const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: string }) =>
      updateProductRequest(data, id),
  });
};

export { useUpdateProduct };

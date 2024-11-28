import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { DumpDetails } from '@dumps/api-schemas/dump';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from '@tanstack/react-query';

const deleteProductByIdRequest = async (id: string) => {
  return httpClient.delete<ApiResponse<DumpDetails>>(api.product.deleteProduct(id));
};

const useDeleteProductById = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProductByIdRequest(id),
  });
};

export default useDeleteProductById;

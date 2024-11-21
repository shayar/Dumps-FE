import { APIResponse } from '@dumps/api-schemas/APIResponse';
import { DumpDetails } from '@dumps/api-schemas/dump';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from '@tanstack/react-query';

const deleteProductByIdRequest = async (id: string) => {
  return await httpClient.delete<APIResponse<DumpDetails>>(api.product.deleteProduct(id));
};

const useDeleteProductById = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProductByIdRequest(id),
    onSuccess: (response: APIResponse<DumpDetails>) => {
      if (response.message) {
        toastSuccess(response.message);
      }
    },
    onError: () => {
      toastFail('Failed to Delete Dumps.');
    },
  });
};

export { useDeleteProductById };

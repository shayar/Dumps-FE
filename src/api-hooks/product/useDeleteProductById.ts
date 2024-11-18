import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from 'react-query';

const deleteProductByIdRequest = async (id: string) => {
  await httpClient.delete(api.product.deleteProduct(id));
};

const useDeleteProductById = () => {
  return useMutation((id: string) => deleteProductByIdRequest(id), {
    onSuccess: (response: any) => {
      if (response.message) {
        toastSuccess(response.message);
      }
    },
    onError: (error: any) => {
      toastFail('Failed to Delete Dumps.');
      console.error(error);
    },
  });
};

export { useDeleteProductById };

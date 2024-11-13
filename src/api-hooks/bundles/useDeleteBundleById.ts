import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from 'react-query';

const deleteBundleByIdRequest = async (id: string) => {
  await httpClient.delete(api.bundles.deleteBundle(id));
};

const useDeleteBundleById = () => {
  return useMutation((id: string) => deleteBundleByIdRequest(id), {
    onSuccess: (response: any) => {
      if (response.message) {
        toastSuccess(response.message);
      }
    },
    onError: (error: any) => {
      toastFail('Failed to Delete Bundle.');
      console.error(error);
    },
  });
};

export { useDeleteBundleById };

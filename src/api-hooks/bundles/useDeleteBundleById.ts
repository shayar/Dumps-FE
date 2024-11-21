import { APIResponse } from '@dumps/api-schemas/APIResponse';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from '@tanstack/react-query';

const deleteBundleByIdRequest = async (id: string) => {
  return await httpClient.delete<APIResponse<BundleResponse>>(api.bundles.deleteBundle(id));
};

const useDeleteBundleById = () => {
  return useMutation({
    mutationFn: (id: string) => deleteBundleByIdRequest(id),
    onSuccess: (response: APIResponse<BundleResponse>) => {
      if (response.message) {
        toastSuccess(response.message);
      }
    },
    onError: () => {
      toastFail('Failed to Delete Bundle.');
    },
  });
};

export { useDeleteBundleById };

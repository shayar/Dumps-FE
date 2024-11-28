import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from '@tanstack/react-query';

const deleteBundleByIdRequest = async (id: string) => {
  return httpClient.delete<ApiResponse<BundleResponse>>(api.bundles.deleteBundle(id));
};

const useDeleteBundleById = () => {
  return useMutation({
    mutationFn: (id: string) => deleteBundleByIdRequest(id),
  });
};

export default useDeleteBundleById;

import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from '@tanstack/react-query';

const addBundleRequest = (data: FormData) => {
  return httpClient.post<ApiResponse<BundleResponse>, FormData>(api.bundles.addBundle, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const useAddBundle = () => {
  return useMutation({
    mutationFn: addBundleRequest,
  });
};

export { useAddBundle };

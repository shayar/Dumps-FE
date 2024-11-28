import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from '@tanstack/react-query';

const updateBundleRequest = (data: FormData, id: string) => {
  return httpClient.patch<ApiResponse<BundleResponse>, FormData>(
    api.bundles.updateBundle(id),
    data
  );
};

const useUpdateBundle = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: string }) => updateBundleRequest(data, id),
  });
};

export { useUpdateBundle };

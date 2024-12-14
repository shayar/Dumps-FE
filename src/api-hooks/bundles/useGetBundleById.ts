import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useQuery } from '@tanstack/react-query';

const getBundleByIdRequest = async (id: string) => {
  return httpClient.get<ApiResponse<BundleResponse>>(api.bundles.getBundle(id));
};

const useGetBundleById = (id: string) => {
  return useQuery({
    queryKey: ['bundles', id],
    queryFn: () => getBundleByIdRequest(id),
    enabled: !!id,
  });
};

export default useGetBundleById;

import { useQuery } from '@tanstack/react-query';

import { httpClient } from '@dumps/service/service-axios';
import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { api } from '@dumps/service/service-api';

const isAdminRequest = async () => {
  const res = await httpClient.get<ApiResponse<boolean>>(api.auth.isAdmin);
  return res.data;
};

export default function useAdminCheck() {
  const token = localStorage.getItem('token');

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ['is-admin', token],
    queryFn: isAdminRequest,
    enabled: !!token,
    staleTime: Infinity,
  });

  return { isAdmin, isLoading };
}

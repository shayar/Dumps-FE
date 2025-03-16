import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from '@tanstack/react-query';

const registerRequest = (registerDetails: FormData) => {
  return httpClient.post<ApiResponse<null>, FormData>(api.auth.register, registerDetails, {
    headers: {
      'Content-Type': 'application/x-www-url-formencoded',
    },
  });
};

const useRegister = () => {
  return useMutation({
    mutationFn: registerRequest,
  });
};

export default useRegister;

import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { RegisterDetails } from '@dumps/api-schemas/auth';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from '@tanstack/react-query';

const registerRequest = (registerDetails: RegisterDetails) => {
  return httpClient.post<ApiResponse<null>, RegisterDetails>(api.auth.register, registerDetails);
};

const useRegister = () => {
  return useMutation({
    mutationFn: registerRequest,
  });
};

export default useRegister;

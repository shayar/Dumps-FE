import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { LoginDetails, LoginResponse } from '@dumps/api-schemas/auth';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from '@tanstack/react-query';

const loginRequest = async (
  loginDetails: LoginDetails,
): Promise<ApiResponse<LoginResponse>> => {
  return await httpClient.post<ApiResponse<LoginResponse>, LoginDetails>(
    api.auth.login,
    loginDetails,
  );
};

const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
  });
};

export { useLogin };

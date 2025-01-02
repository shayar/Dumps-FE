import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { LoginDetails, UserResponse } from '@dumps/api-schemas/auth';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from '@tanstack/react-query';

const loginRequest = async (loginDetails: LoginDetails): Promise<ApiResponse<UserResponse>> => {
  return httpClient.post<ApiResponse<UserResponse>, LoginDetails>(api.auth.login, loginDetails);
};

const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
  });
};

export default useLogin;

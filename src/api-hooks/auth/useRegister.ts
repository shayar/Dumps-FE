import { RegisterDetails } from '@dumps/api-schemas/auth';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from '@tanstack/react-query';

const registerRequest = (registerDetails: RegisterDetails) => {
  return httpClient.post(api.auth.register, registerDetails);
};

const useRegister = () => {
  return useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      toastSuccess('Register Successfully');
    },
    onError: () => {
      toastFail('Register Failed');
    },
  });
};

export { useRegister };

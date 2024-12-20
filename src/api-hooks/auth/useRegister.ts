import { RegisterDetails } from '@dumps/api-schemas/auth';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from 'react-query';

const registerRequest = (registerDetails: RegisterDetails) => {
  return httpClient.post(api.auth.register, registerDetails);
};

const useRegister = () => {
  return useMutation(registerRequest, {
    onSuccess: (response) => {
      console.log(response);
      toastSuccess('Register Successfully')
    },
    onError: (error) => {
      console.log(error);
      toastFail('Register Failed')
    },
  });
};

export { useRegister };
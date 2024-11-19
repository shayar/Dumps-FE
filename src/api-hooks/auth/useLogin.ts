import { LoginDetails } from '@dumps/api-schemas/auth';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const loginRequest = (loginDetails: LoginDetails) => {
  return httpClient.post(api.auth.login, loginDetails);
};

const useLogin = () => {
  const navigate = useNavigate();
  return useMutation(loginRequest, {
    onSuccess: (response: any) => {
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
      toastSuccess('Login Successful');
    },
    onError: (error: any) => {
      toastFail('Login Failed');
      console.log(error)
      // return error.response.data.errors.error;
    },
  });
};

export { useLogin };

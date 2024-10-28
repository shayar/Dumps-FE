import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const loginRequest = (loginData: { email: string; password: string }) => {
  return httpClient.post(api.auth.login, loginData);
};

const useLogin = () => {
  const navigate = useNavigate();
  return useMutation(loginRequest, {
    onSuccess: (response: any) => {
      localStorage.setItem('token', response.data.token);
      navigate('/');
    },
    onError: (error: any) => {
      return error.response.data.errors.error;
    },
  });
};

export { useLogin };

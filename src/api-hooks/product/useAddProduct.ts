import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const addProductRequest = (data: FormData) => {
  return httpClient.post(api.product.addProduct, data);
};

const useAddProduct = () => {
  const navigate = useNavigate();
  return useMutation(addProductRequest, {
    onSuccess: () => {
      navigate('/dumps');
      toastSuccess('Successfully added Product.');
    },
    onError: (error: any) => {
      toastFail('Failed to add Product.');
      console.log(error);
      // return error.response.data.errors.error;
    },
  });
};

export { useAddProduct };

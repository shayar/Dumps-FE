import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const addProductRequest = (data: FormData) => {
  return httpClient.post(api.product.addProduct, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const useAddProduct = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addProductRequest,
    onSuccess: () => {
      navigate(-1);
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

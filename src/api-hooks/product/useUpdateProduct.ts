import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const updateProductRequest = (data: FormData, id: string) => {
  return httpClient.put(api.product.updateProduct(id), data);
};

const useUpdateProduct = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: string }) =>
      updateProductRequest(data, id),
    onSuccess: () => {
      navigate(-1);
      toastSuccess('Successfully updated Product.');
    },
    onError: () => {
      toastFail('Failed to update Product.');
    },
  });
};

export { useUpdateProduct };

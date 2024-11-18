import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const updateProductRequest = (data: FormData, id: string) => {
  return httpClient.put(api.product.updateProduct(id), data);
};

const useUpdateProduct = () => {
  const navigate = useNavigate();
  return useMutation(
    ({ data, id }: { data: FormData; id: string }) => updateProductRequest(data, id),
    {
      onSuccess: () => {
        navigate('/dumps');
        toastSuccess('Successfully updated Product.');
      },
      onError: (error: any) => {
        toastFail('Failed to update Product.');
        console.log(error);
      },
    }
  );
};

export { useUpdateProduct };

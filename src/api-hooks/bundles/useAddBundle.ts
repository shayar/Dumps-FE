import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const addBundleRequest = (data: FormData) => {
  return httpClient.post(api.bundles.addBundle, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const useAddBundle = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addBundleRequest,
    onSuccess: () => {
      navigate(-1);
      toastSuccess('Successfully added Bundle.');
    },
    onError: (error: any) => {
      toastFail('Failed to add Bundle.');
      console.log(error);
    },
  });
};

export { useAddBundle };

import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const updateBundleRequest = (data: FormData, id: string) => {
  return httpClient.put(api.bundles.updateBundle(id), data);
};

const useUpdateBundle = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: string }) =>
      updateBundleRequest(data, id),
    onSuccess: () => {
      navigate('/bundles');
      toastSuccess('Successfully updated Bundle.');
    },
    onError: (error: any) => {
      toastFail('Failed to update Bundle.');
      console.log(error);
    },
  });
};

export { useUpdateBundle };

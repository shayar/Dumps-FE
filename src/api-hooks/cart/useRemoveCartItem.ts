import { httpClient } from '@dumps/service/service-axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@dumps/service/service-api';
import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import { DumpDetails } from '@dumps/api-schemas/dump';

const deleteCartItem = async (item: BundleResponse | DumpDetails) => {
  const isBundle = 'isBundle' in item;
  return httpClient.delete<ApiResponse<string>>(api.cart.removeItem, {
    data: {
      productId: isBundle ? null : item.id,
      bundleId: isBundle ? item.id : null,
    },
  });
};

const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: BundleResponse | DumpDetails) => deleteCartItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export default useRemoveCartItem;

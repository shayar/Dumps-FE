import { httpClient } from '@dumps/service/service-axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@dumps/service/service-api';
import { ApiResponse } from '@dumps/api-schemas/APIResponse';

const clearCartItems = async () => {
  return httpClient.delete<ApiResponse<string>>(api.cart.clear);
};

const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCartItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export default useClearCart;

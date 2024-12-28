import { httpClient } from '@dumps/service/service-axios';
import { useQuery } from '@tanstack/react-query';

import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { api } from '@dumps/service/service-api';
import { CartResponse } from '@dumps/api-schemas/cart';

const getUserCart = async (): Promise<ApiResponse<CartResponse>> => {
  return httpClient.get<ApiResponse<CartResponse>>(api.cart.getUserCart);
};
const useGetUserCartItems = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getUserCart(),
  });
};

export default useGetUserCartItems;

import { ApiResponse } from '@dumps/api-schemas/APIResponse';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import { AddToCartRequest } from '@dumps/api-schemas/cart';
import { api } from '@dumps/service/service-api';
import { httpClient } from '@dumps/service/service-axios';
import { useMutation } from '@tanstack/react-query';

const addToCartRequest = (data: AddToCartRequest) => {
  return httpClient.post<ApiResponse<BundleResponse>, AddToCartRequest>(api.cart.addToCart, data);
};

const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCartRequest,
  });
};

export default useAddToCart;

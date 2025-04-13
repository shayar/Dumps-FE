import { Flex, Heading } from '@chakra-ui/react';

import useGetUserCartItems from '@dumps/api-hooks/cart/useGetCartByUserId';
import CartCheckoutItems from '@dumps/components/CartCheckoutItems/cartCheckoutItems';

export default function Cart() {
  const { data: cart } = useGetUserCartItems();
  const cartItems = cart?.data.items || [];

  return cartItems && cartItems.length > 0 ? (
    <CartCheckoutItems isCheckout orderItem={cart!.data} />
  ) : (
    <Flex minH="calc(100vh - 72px)" justifyContent="center" alignItems="center">
      <Heading as="h2" size="xl" noOfLines={1}>
        No items in your cart to checkout
      </Heading>
    </Flex>
  );
}

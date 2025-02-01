import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Divider,
  Card,
  CardBody,
  Flex,
  Badge,
  Button,
  List,
  ListItem,
  ListIcon,
  Heading,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { DumpDetails } from '@dumps/api-schemas/dump';
import { FiCheck, FiTrash, FiTrash2 } from 'react-icons/fi';
import { useRef, useState } from 'react';

import useGetUserCartItems from '@dumps/api-hooks/cart/useGetCartByUserId';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import useRemoveCartItem from '@dumps/api-hooks/cart/useRemoveCartItem';
import { toastSuccess } from '@dumps/service/service-toast';
import handleApiError from '@dumps/service/service-utils';
import useClearCart from '@dumps/api-hooks/cart/useClearCart';

export default function Cart() {
  const { data: cart } = useGetUserCartItems();
  const cartItems = cart?.data.items || [];

  const [selectedItem, setSelectedItem] = useState<DumpDetails | BundleResponse | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const { mutateAsync: clearCartItems } = useClearCart();
  const { mutateAsync: deleteCartItem } = useRemoveCartItem();

  const [actionType, setActionType] = useState<'delete' | 'clear'>('delete');

  const handleDeleteClick = (item: DumpDetails | BundleResponse) => {
    setSelectedItem(item);
    setActionType('delete');
    onOpen();
  };

  const handleClearCartClick = () => {
    setSelectedItem(null);
    setActionType('clear');
    onOpen();
  };

  const handleConfirmAction = async () => {
    try {
      if (actionType === 'delete' && selectedItem) {
        const res = await deleteCartItem(selectedItem);
        toastSuccess(res.data);
      } else if (actionType === 'clear') {
        const res = await clearCartItems();
        toastSuccess(res.data);
      }
    } catch (error) {
      handleApiError(error);
    }
    onClose();
  };

  const TAX_RATE = 0.08; // 8% tax rate

  const calculateTotal = () => {
    const subtotal = Number(cart?.data.totalPrice) || 0;
    const tax = subtotal * TAX_RATE;
    return { subtotal, tax, total: subtotal + tax };
  };

  const renderProductDetails = (item: DumpDetails | BundleResponse) => {
    const isBundle = 'isBundle' in item;
    const displayProducts = isBundle ? item.products.slice(0, 2) : [];
    const remainingProductCount = isBundle ? Math.max(0, item.products.length - 2) : 0;

    const itemPrice = isBundle
      ? item.discountedPrice
      : Number(item.price) - Number(item.price) * Number(item.discount) * 0.01;
    const originalItemPrice = isBundle ? item.totalPrice : Number(item.price);

    return (
      <Card key={item.id} variant="outline" width="full" mb={4}>
        <CardBody>
          <Flex flexDirection="column" width="full">
            <Flex justifyContent="space-between" alignItems="start" width="full" mb={4}>
              <VStack align="start" spacing={3} flex={1} pr={4}>
                <Text fontWeight="bold" fontSize="lg">
                  {item.title}
                  {isBundle && (
                    <Badge ml={2} colorScheme="green">
                      Bundle
                    </Badge>
                  )}
                </Text>
                <Text color="gray.600" fontSize="sm">
                  {item.description}
                </Text>

                {/* Bundle and Product Preview */}
                {isBundle && (
                  <List spacing={2}>
                    {displayProducts.map((product) => (
                      <ListItem key={product.id} fontSize="sm">
                        <HStack>
                          <ListIcon as={FiCheck} color="green.500" />
                          <Text>{product.title}</Text>
                        </HStack>
                      </ListItem>
                    ))}
                    {remainingProductCount > 0 && (
                      <ListItem fontSize="sm">
                        <HStack>
                          <ListIcon as={FiCheck} color="green.500" />
                          <Text>+{remainingProductCount} more</Text>
                        </HStack>
                      </ListItem>
                    )}
                  </List>
                )}
              </VStack>

              {/* Price */}
              <VStack align="end" spacing={1} ml={4}>
                <Text fontWeight="bold" color="green.500" fontSize="lg">
                  ${itemPrice.toFixed(2)}
                </Text>
                {itemPrice !== originalItemPrice && (
                  <Text color="gray.500" textDecoration="line-through" fontSize="sm">
                    ${originalItemPrice.toFixed(2)}
                  </Text>
                )}
              </VStack>
            </Flex>

            {/* Delete button */}
            <Flex justifyContent="flex-end" width="full">
              <IconButton
                icon={<FiTrash />}
                colorScheme="red"
                variant="ghost"
                size="sm"
                aria-label="Remove item"
                onClick={() => handleDeleteClick(item)}
              />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    );
  };

  const { subtotal, tax, total } = calculateTotal();

  return cartItems && cartItems.length > 0 ? (
    <>
      <Flex p={12} mx="auto" direction={{ base: 'column', md: 'row' }} gap={6}>
        {/* Items Section */}
        <VStack width={{ base: '100%', md: '70%' }} spacing={4} align="stretch">
          <Flex justifyContent="space-between">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Your Cart ({cartItems.length} Items)
            </Text>
            <IconButton
              isRound
              icon={<FiTrash2 />}
              colorScheme="red"
              variant="ghost"
              size="lg"
              aria-label="Remove item"
              onClick={handleClearCartClick}
            />
          </Flex>
          {cartItems.map(renderProductDetails)}
        </VStack>

        {/* Order Summary */}
        <VStack
          width={{ base: '100%', md: '30%' }}
          spacing={4}
          p={6}
          borderRadius="md"
          align="stretch"
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Order Summary
          </Text>
          <HStack justifyContent="space-between">
            <Text>Subtotal</Text>
            <Text fontWeight="bold">${subtotal.toFixed(2)}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Tax (8%)</Text>
            <Text fontWeight="bold">${tax.toFixed(2)}</Text>
          </HStack>
          <Divider />
          <HStack justifyContent="space-between" mt={2}>
            <Text fontSize="lg" fontWeight="bold">
              Total
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="green.500">
              ${total.toFixed(2)}
            </Text>
          </HStack>
          <Box>
            <Button width="full">Proceed to Checkout</Button>
          </Box>
        </VStack>
      </Flex>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {actionType === 'delete' ? 'Delete Item' : 'Clear Cart'}
            </AlertDialogHeader>

            <AlertDialogBody>
              {actionType === 'delete'
                ? 'Are you sure you want to delete this item?'
                : 'Are you sure you want to clear your entire cart? This action cannot be undone.'}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmAction} ml={3}>
                {actionType === 'delete' ? 'Delete' : 'Clear'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  ) : (
    <Flex minH="calc(100vh - 72px)" justifyContent="center" alignItems="center">
      <Heading as="h2" size="xl" noOfLines={1}>
        No items in cart
      </Heading>
    </Flex>
  );
}

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
} from '@chakra-ui/react';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import { DumpDetails } from '@dumps/api-schemas/dump';
import { FiCheck, FiTrash } from 'react-icons/fi';

export default function Cart() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cartItems: any = [
    {
      id: 'prod1',
      title: 'Advanced Python Programming',
      codeTitle: 'PYTHON-ADV-001',
      description: 'A comprehensive guide to advanced Python techniques and best practices',
      price: '20',
      discount: '5',
      pdfFile: {}, // Placeholder for PDF file
    },
    {
      id: 'prod2',
      title: 'React Design Patterns',
      codeTitle: 'REACT-DESIGN-002',
      description: 'Master modern React development with proven design patterns',
      price: '30',
      discount: '0',
      pdfFile: {}, // Placeholder for PDF file
    },
    {
      id: 'bundle1',
      title: 'Full Stack Web Development Bundle',
      description: 'Complete package for becoming a full stack web developer',
      discountedPrice: 35,
      totalPrice: 40,
      products: [
        {
          id: 'bundle1-prod1',
          title: 'Modern JavaScript Deep Dive',
          codeTitle: 'JS-DEEP-001',
          description: 'Advanced JavaScript concepts and techniques',
          price: '59.99',
          discount: '79.99',
          pdfFile: {},
        },
        {
          id: 'bundle1-prod2',
          title: 'Node.js Backend Development',
          codeTitle: 'NODE-BACK-002',
          description: 'Build scalable backend applications with Node.js',
          price: '69.99',
          discount: '89.99',
          pdfFile: {},
        },
        {
          id: 'bundle1-prod3',
          title: 'React Mastery',
          codeTitle: 'REACT-MASTER-003',
          description: 'From basics to advanced React development',
          price: '59.99',
          discount: '79.99',
          pdfFile: {},
        },
      ],
    },
  ];

  const onRemoveItem = (item: DumpDetails | BundleResponse) => {
    console.log('item removed', item.id);
  };

  const TAX_RATE = 0.08; // 8% tax rate

  const calculateItemPrice = (item: DumpDetails | BundleResponse) => {
    if ('discountedPrice' in item) {
      return item.discountedPrice;
    }
    return parseFloat(item.price);
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total: number, item: DumpDetails | BundleResponse) => total + calculateItemPrice(item),
      0
    );
    const tax = subtotal * TAX_RATE;
    return { subtotal, tax, total: subtotal + tax };
  };

  const renderProductDetails = (item: DumpDetails | BundleResponse) => {
    const isBundle = 'products' in item;
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
                <Text color="gray.500" textDecoration="line-through" fontSize="sm">
                  ${originalItemPrice.toFixed(2)}
                </Text>
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
                onClick={() => onRemoveItem(item)}
              />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    );
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <Flex p={12} mx="auto" direction={{ base: 'column', md: 'row' }} gap={6}>
      {/* Items Section */}
      <VStack width={{ base: '100%', md: '70%' }} spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Your Cart ({cartItems.length} Items)
        </Text>
        {cartItems.length === 0 ? (
          <Text color="gray.500" textAlign="center">
            Your cart is empty
          </Text>
        ) : (
          cartItems.map(renderProductDetails)
        )}
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
  );
}

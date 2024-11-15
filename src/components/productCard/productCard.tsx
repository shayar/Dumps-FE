import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FiShoppingCart, FiFileText } from 'react-icons/fi';

const RibbonBadge = ({ discount }: { discount: number }) => (
  <Box
    position="absolute"
    top={0}
    right={0}
    borderTopRightRadius={'md'}
    bg="green.500"
    color="white"
    fontSize="xs"
    fontWeight="semibold"
    px={2}
    py={0.5}
    _after={{
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: '-8px',
      width: 0,
      height: 0,
      borderLeft: '12px solid transparent',
      borderRight: '12px solid transparent',
      borderTop: '8px solid green.500',
      borderTopColor: 'green.500',
    }}
  >
    {discount}% OFF
  </Box>
);

const ProductCard = ({ product }: { product: any }) => {
  const finalPrice = product.price * (1 - (product.discount || 0) / 100);

  return (
    <Box
      position={'relative'}
      bg="white"
      borderRadius="md"
      boxShadow="base"
      p={6}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)' }}
      height="full"
    >
      <Flex direction="column" height="full" gap={4}>
        {/* Discount Badge - naturally takes its height */}
        {(product?.discount > 0) && (
          <RibbonBadge discount={product.discount} />
        )}

        {/* Title - uses noOfLines instead of fixed height */}
        <Heading size="md" minH={50} noOfLines={2}>
          {product.title}
        </Heading>

        {/* Main content area - takes remaining space */}
        <Flex flex="1" direction="column" justify="space-between">
          <HStack spacing={3} align="flex-start" justify="space-between">
            <Box>
              {/* Code */}
              <Text color="gray.500" fontSize="sm">
                Code: {product.codeTitle}
              </Text>

              {/* Price */}
              <Box mt={2}>
                {product.discount ? (
                  <VStack align="flex-start" spacing={1}>
                    <Text
                      textDecoration="line-through"
                      color="gray.500"
                      fontSize="sm"
                    >
                      ${product.price.toFixed(2)}
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color="blue.500">
                      ${finalPrice.toFixed(2)}
                    </Text>
                  </VStack>
                ) : (
                  <Text fontSize="xl" fontWeight="bold" color="blue.500">
                    ${product.price.toFixed(2)}
                  </Text>
                )}
              </Box>
            </Box>

            {/* File Icon */}
            <Icon as={FiFileText} boxSize={14} color="blue.500" />
          </HStack>
        </Flex>

        {/* Button - stays at bottom */}
        <Box flex="0">
          <Button
            colorScheme="blue"
            rightIcon={<FiShoppingCart />}
            width="full"
          >
            Add to Cart
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductCard;

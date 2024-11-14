import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { FiShoppingCart, FiFileText } from 'react-icons/fi';

const ProductCard = ({ product }: { product: any }) => {
  const finalPrice = product.price * (1 - (product.discount || 0) / 100);

  return (
    <Box
      bg={'white'}
      borderRadius="lg"
      boxShadow="md"
      p={6}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
      height="full"
    >
      <VStack align="stretch" spacing={4} height="full">
        {/* Discount Badge Container */}
        <Box minH="24px">
          {product.discount ? (
            <Badge colorScheme="green" fontSize="sm">
              {product.discount}% OFF
            </Badge>
          ) : null}
        </Box>

        {/* Title Container */}
        <Heading size="md" noOfLines={2}>
          {product.title}
        </Heading>

        {/* Code Price Container with Icon */}
        <HStack spacing={3} display={'flex'} justifyContent={'space-between'}>
          <Box>
            {/* Code Container */}
            <Box minH="20px">
              <Text color="gray.500" fontSize="sm">
                Code: {product.codeTitle}
              </Text>
            </Box>

            {/* Price Container */}
            <Box minH="60px">
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
          {/* File Icon container */}
          <Icon as={FiFileText} boxSize={14} color={'primary.500'} mt={1} />
        </HStack>

        {/* Button Container */}
        <Box>
          <Button
            colorScheme="blue"
            rightIcon={<FiShoppingCart />}
            width="full"
          >
            Add to Cart
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProductCard;

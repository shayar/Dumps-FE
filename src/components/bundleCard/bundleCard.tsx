import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  Badge,
  List,
  ListItem,
  ListIcon,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import { FiShoppingCart, FiPackage, FiCheck } from 'react-icons/fi';

function BundleCard({ bundle }: { bundle: BundleResponse }) {
  const originalPrice =
    bundle?.products?.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.price),
      0
    ) ?? 0;
  const finalPrice = (originalPrice ?? 0) - Number(bundle.discountedPrice);
  const productsToShow = bundle?.products?.length > 3 ? 2 : bundle?.products?.length;
  const remainingProducts = (bundle?.products?.length ?? 0) - productsToShow;

  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="base"
      p={6}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)' }}
      height="full"
    >
      <VStack align="stretch" spacing={4} height="full">
        {/* Title Container */}
        <Heading size="md" noOfLines={2} minH={50}>
          {bundle.title}
        </Heading>

        {/* Code Container */}
        <Text color="gray.500" fontSize="sm" noOfLines={1}>
          {bundle.description}
        </Text>

        {/* Products list with bundle icon */}
        <Flex minH="80px" justifyContent="space-between" alignItems="center">
          {/* Products List */}
          <List spacing={2}>
            {bundle.products?.slice(0, productsToShow).map((product) => (
              <ListItem key={product.id} fontSize="sm">
                <HStack>
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text>{product.title}</Text>
                </HStack>
              </ListItem>
            ))}
            {remainingProducts > 0 && (
              <ListItem fontSize="sm">
                <HStack>
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text color="blue.500" fontWeight="medium">
                    +{remainingProducts} more products
                  </Text>
                </HStack>
              </ListItem>
            )}
          </List>
          <Icon as={FiPackage} boxSize={12} color="primary.500" />
        </Flex>

        {/* Price Container */}
        <Box>
          <HStack justify="space-between" align="flex-end">
            <VStack align="flex-start" spacing={1}>
              <Text textDecoration="line-through" color="gray.500" fontSize="sm">
                ${originalPrice.toFixed(2)}
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                ${finalPrice.toFixed(2)}
              </Text>
            </VStack>
            <Badge colorScheme="green" fontSize="sm">
              Save ${(originalPrice - finalPrice).toFixed(2)}
            </Badge>
          </HStack>
        </Box>

        {/* Button Container */}
        <Button colorScheme="blue" rightIcon={<FiShoppingCart />} width="full" size="lg">
          Add Bundle to Cart
        </Button>
      </VStack>
    </Box>
  );
}
export default BundleCard;

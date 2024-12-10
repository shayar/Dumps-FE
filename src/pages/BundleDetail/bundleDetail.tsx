import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Collapse,
} from '@chakra-ui/react';
import LoadingSpinner from '@dumps/components/loadingSpinner';
import { FiShoppingCart, FiFileText, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { DumpDetails } from '@dumps/api-schemas/dump';
import useGetBundleById from '@dumps/api-hooks/bundles/useGetBundleById';

function PDFPreview({ title, products }: { title: string; products: DumpDetails[] }) {
  // Show first 3 products
  const displayProducts = products.slice(0, 3);

  return (
    <Box
      width="280px"
      height="360px"
      bg="white"
      borderRadius="md"
      boxShadow="lg"
      position="relative"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
    >
      {/* PDF Header */}
      <Box
        height="40px"
        bg="red.500"
        borderTopRadius="md"
        display="flex"
        alignItems="center"
        px={4}
      >
        <Icon as={FiFileText} color="white" boxSize={6} />
      </Box>

      {/* PDF Content */}
      <Box p={6} height="calc(100% - 40px)" position="relative">
        {/* Watermark lines */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.05}
          backgroundImage="repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)"
          backgroundSize="10px 10px"
        />

        {/* Multi-page Preview */}
        <VStack spacing={4} width="100%" height="100%" overflowY="auto">
          {/* Main Title Page */}
          <Box width="100%" textAlign="center" position="relative" mb={4}>
            <Text fontSize="md" fontWeight="bold" color="gray.700" wordBreak="break-word">
              {title}
            </Text>
          </Box>

          {/* Product Pages */}
          {displayProducts.map((product) => (
            <Box
              key={product.id}
              width="100%"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              p={2}
              mb={2}
            >
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="gray.600"
                textAlign="center"
                noOfLines={2}
              >
                {product.title}
              </Text>
            </Box>
          ))}

          {products.length > 3 && (
            <Text fontSize="xs" color="gray.500" textAlign="center" mt={2}>
              + {products.length - 3} more products
            </Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
}

function BundleDetail() {
  const { id: bundleId } = useParams();
  const [showAllProducts, setShowAllProducts] = useState(false);

  const { data, isLoading } = useGetBundleById(bundleId!);
  const bundle = data?.data;

  // Calculate total original price and discounted price
  const bundlePricing = useMemo(() => {
    if (!bundle?.products)
      return {
        totalOriginalPrice: 0,
        bundlePrice: 0,
        savingsAmount: 0,
      };

    // Calculate total original price
    const totalOriginalPrice = bundle.products.reduce(
      (sum, product) => sum + Number(product.price || 0),
      0
    );

    // Calculate bundle price (total original price - discounted price)
    const bundlePrice = totalOriginalPrice - Number(bundle.discountedPrice || 0);

    // Calculate savings (discounted price)
    const savingsAmount = Number(bundle.discountedPrice || 0);

    return {
      totalOriginalPrice,
      bundlePrice,
      savingsAmount,
    };
  }, [bundle]);
  // Initial 3 products to display
  const initialProducts = bundle?.products?.slice(0, 3) || [];
  const remainingProducts = bundle?.products?.slice(3) || [];

  return (
    <Container minW="full" position="relative" py={12}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
          {/* Left Column - PDF image */}
          <Box flex="1" display="flex" alignItems="center" justifyContent="center">
            <PDFPreview title={bundle?.title || ''} products={bundle?.products || []} />
          </Box>

          {/* Right Column - Bundle Info */}
          <Box flex="1">
            <VStack align="stretch" spacing={6}>
              <Heading size="xl">{bundle?.title}</Heading>

              <Box>
                <HStack spacing={3} alignItems="center" wrap="wrap">
                  <Text textDecoration="line-through" color="gray.500" fontSize="xl">
                    ${bundlePricing.totalOriginalPrice.toFixed(2)}
                  </Text>
                  <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                    ${bundlePricing.bundlePrice.toFixed(2)}
                  </Text>
                  <Text bg="green.500" color="white" px={2} py={1} borderRadius="md" fontSize="md">
                    Save ${bundlePricing.savingsAmount.toFixed(2)}
                  </Text>
                </HStack>
                {bundle?.products && (
                  <Text color="gray.500" fontSize="md" mt={2}>
                    ({bundle.products.length} Products)
                  </Text>
                )}
              </Box>

              <Text color="gray.700" fontSize="md">
                {bundle?.description}
              </Text>

              {/* Products List */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                  Bundle Includes:
                </Text>
                <VStack spacing={3} align="stretch">
                  {/* Initial 3 products */}
                  {initialProducts.map((product) => (
                    <Box
                      key={product.id}
                      bg="gray.100"
                      px={3}
                      py={2}
                      borderRadius="md"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text fontSize="sm" fontWeight="medium">
                        {product.title}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        ${Number(product.price).toFixed(2)}
                      </Text>
                    </Box>
                  ))}

                  {/* Collapsible remaining products */}
                  {remainingProducts.length > 0 && (
                    <>
                      <Collapse in={showAllProducts}>
                        {remainingProducts.map((product) => (
                          <Box
                            key={product.id}
                            bg="gray.100"
                            px={3}
                            py={2}
                            borderRadius="md"
                            mt={2}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text fontSize="sm" fontWeight="medium">
                              {product.title}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              ${Number(product.price).toFixed(2)}
                            </Text>
                          </Box>
                        ))}
                      </Collapse>
                      {remainingProducts.length > 0 && (
                        <Button
                          variant="ghost"
                          colorScheme="blue"
                          rightIcon={showAllProducts ? <FiChevronUp /> : <FiChevronDown />}
                          onClick={() => setShowAllProducts(!showAllProducts)}
                          alignSelf="center"
                        >
                          {showAllProducts ? 'Show Less' : `Show ${remainingProducts.length} More`}
                        </Button>
                      )}
                    </>
                  )}
                </VStack>
              </Box>

              <HStack spacing={4}>
                <Button size="lg" colorScheme="blue" rightIcon={<FiShoppingCart />} flex="1">
                  Add to Cart
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Flex>
      )}
    </Container>
  );
}

export default BundleDetail;

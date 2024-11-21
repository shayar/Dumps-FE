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
} from '@chakra-ui/react';
import { useGetProductById } from '@dumps/api-hooks/product/useGetProductById';
import LoadingSpinner from '@dumps/components/loadingSpinner';
import { FiShoppingCart, FiFileText } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const PDFPreview = ({ title }: { title: string }) => {
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

        {/* Title */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="90%"
          textAlign="center"
        >
          <Text
            fontSize="md"
            fontWeight="bold"
            color="gray.700"
            wordBreak="break-word"
          >
            {title}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const ProductDetail = () => {
  const { id: productId } = useParams();

  const { data, isLoading } = useGetProductById(productId!);
  const product = data?.data;

  const finalPrice: number = Number(
    (
      Number(product?.price || 0) *
      (1 - Number(product?.discount || 0) / 100)
    ).toFixed(2),
  );

  return (
    <Container minW={'full'} position={'relative'} py={12}>
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
          {/* Left Column - PDF image */}
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <PDFPreview title={product?.title || ''} />
          </Box>

          {/* Right Column - Product Info */}
          <Box flex="1">
            <VStack align="stretch" spacing={6}>
              <Heading size="xl">{product?.title}</Heading>

              <Text color="gray.600" fontSize="lg">
                Code: {product?.codeTitle}
              </Text>

              <Box>
                {product?.discount ? (
                  <HStack spacing={3}>
                    <Text
                      textDecoration="line-through"
                      color="gray.500"
                      fontSize="xl"
                    >
                      ${Number(product.price).toFixed(2)}
                    </Text>
                    <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                      ${finalPrice}
                    </Text>
                    <Text
                      bg="green.500"
                      color="white"
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="md"
                    >
                      {product.discount}% OFF
                    </Text>
                  </HStack>
                ) : (
                  <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                    ${Number(product?.price).toFixed(2)}
                  </Text>
                )}
              </Box>

              <Text color="gray.700" fontSize="md">
                {product?.description}
              </Text>

              <HStack spacing={4}>
                <Button
                  size="lg"
                  colorScheme="blue"
                  rightIcon={<FiShoppingCart />}
                  flex="1"
                >
                  Add to Cart
                </Button>
                {/* <Button
                size="lg"
                colorScheme="blue"
                variant="outline"
                rightIcon={<FiDownload />}
                flex="1"
              >
                Download Demo
              </Button> */}
              </HStack>
            </VStack>
          </Box>
        </Flex>
      )}
    </Container>
  );
};
export default ProductDetail;

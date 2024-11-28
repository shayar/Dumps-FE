import {
  Container,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useGetAllProducts } from '@dumps/api-hooks/product/useGetAllProducts';
import { DumpDetails } from '@dumps/api-schemas/dump';
import LoadingSpinner from '@dumps/components/loadingSpinner';
import ProductCard from '@dumps/components/productCard/productCard';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Products = () => {
  const [sortBy, setSortBy] = useState('popular');
  const [page] = useState(1);
  const { data: getAllProducts, isLoading } = useGetAllProducts(page, 10);
  const products = getAllProducts?.data;

  return (
    <Container minW={'full'} py={8}>
      {/* Header */}
      <VStack spacing={8} align="stretch">
        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <Heading size="xl">Certification Materials</Heading>
          <Text color="gray.600">Showing {products?.length} results</Text>
        </Stack>

        {/* Filters and Search */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          align="center"
          justifyContent="space-between"
        >
          <InputGroup maxW={'full'}>
            <InputLeftElement>
              <FiSearch />
            </InputLeftElement>
            <Input placeholder="Search certifications..." />
          </InputGroup>

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            maxW={{ base: 'full', md: '200px' }}
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </Select>
        </Stack>

        {/* Products Grid */}
        <Grid
          position={'relative'}
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={6}
        >
          {isLoading && <LoadingSpinner />}
          {!isLoading &&
            products &&
            products.length > 0 &&
            products.map((product: DumpDetails) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </Grid>
      </VStack>
    </Container>
  );
};

export default Products;

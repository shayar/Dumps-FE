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
import ProductCard from '@dumps/components/productCard/productCard';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const sampleProducts = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect',
    codeTitle: 'AWS-SAA-C03',
    price: 49.99,
    discount: 20,
    filename: 'aws-solutions-architect-practice-exam.pdf',
  },
  {
    id: 2,
    title: 'CompTIA Security+',
    codeTitle: 'SY0-601',
    price: 39.99,
    discount: 0,
    filename: 'security-plus-study-guide.pdf',
  },
  // Add more sample products as needed
];

const Products = () => {
  const [sortBy, setSortBy] = useState('popular');

  return (
    <Container maxW="7xl" py={8}>
      {/* Header */}
      <VStack spacing={8} align="stretch">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
        >
          <Heading size="xl">Certification Materials</Heading>
          <Text color="gray.600">Showing {sampleProducts.length} results</Text>
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
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={6}
        >
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </VStack>
    </Container>
  );
};

export default Products;

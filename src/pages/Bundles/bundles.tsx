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
import useGetAllBundles from '@dumps/api-hooks/bundles/useGetAllBundles';
import { BundleResponse } from '@dumps/api-schemas/bundle';
import BundleCard from '@dumps/components/bundleCard/bundleCard';
import LoadingSpinner from '@dumps/components/loadingSpinner';
import Sort from '@dumps/enums/sort.enum';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function Bundles() {
  const [sortBy, setSortBy] = useState<Sort>(Sort.NEWEST);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page] = useState(1);
  const { data: getAllBundles, isLoading } = useGetAllBundles(page, 10, sortBy, debouncedSearch);
  const bundles = getAllBundles?.data;

  useEffect(() => {
    // Create a timeout to delay the search
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500); // 500ms delay

    // Cleanup function to cancel the timeout if the input changes
    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  // Handler for search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Handler for sort selection
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as Sort);
  };

  return (
    <Container minW="full" py={8}>
      {/* Header */}
      <VStack spacing={8} align="stretch">
        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <Heading size="xl">Bundles</Heading>
          <Text color="gray.600">Showing {bundles?.length} results</Text>
        </Stack>

        {/* Filters and Search */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          align="center"
          justifyContent="space-between"
        >
          <InputGroup maxW="full">
            <InputLeftElement>
              <FiSearch />
            </InputLeftElement>
            <Input
              placeholder="Search bundles..."
              value={searchInput}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <Select value={sortBy} onChange={handleSortChange} maxW={{ base: 'full', md: '200px' }}>
            <option value={Sort.NEWEST}>Newest</option>
            <option value={Sort.PRICE_LOW_TO_HIGH}>Price: Low to High</option>
            <option value={Sort.PRICE_HIGH_TO_LOW}>Price: High to Low</option>
          </Select>
        </Stack>

        {/* Bundles Grid */}
        <Grid
          position="relative"
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={6}
        >
          {isLoading && <LoadingSpinner />}
          {!isLoading &&
            bundles &&
            bundles?.length > 0 &&
            bundles?.map((bundle: BundleResponse) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
        </Grid>
      </VStack>
    </Container>
  );
}

export default Bundles;

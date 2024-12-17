import { Flex, Button, Text, ButtonGroup, IconButton } from '@chakra-ui/react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  // onPageSizeChange: (size: number) => void;
  // pageSizeOptions: number[];
}

function Paging({
  pageNumber = 1,
  pageSize = 10,
  totalPages = 0,
  totalRecords = 0,
  onPageChange,
  // onPageSizeChange,
  // pageSizeOptions = [10, 20, 50, 100],
}: PaginationProps) {
  const startRecord = (pageNumber - 1) * pageSize + 1;
  const endRecord = Math.min(pageNumber * pageSize, totalRecords);

  const generatePageNumbers = () => {
    const pages: (number | { id: string; value: number })[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (pageNumber <= 3) {
        pages.push(2, 3, 4);
        pages.push({ id: 'ellipsis-end', value: -1 });
        pages.push(totalPages);
      } else if (pageNumber >= totalPages - 2) {
        pages.push({ id: 'ellipsis-start', value: -1 });
        for (let i = totalPages - 3; i <= totalPages; i += 1) {
          pages.push(i);
        }
      } else {
        pages.push({ id: 'ellipsis-start', value: -1 });
        pages.push(pageNumber - 1, pageNumber, pageNumber + 1);
        pages.push({ id: 'ellipsis-end', value: -1 });
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1 && totalRecords <= pageSize) {
    return null;
  }

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      width="full"
      gap={4}
    >
      <Flex alignItems="center" gap={4}>
        {/* <Flex alignItems="center" gap={2}>
          <Text whiteSpace="nowrap">Show</Text>
          <Select
            size="sm"
            width="auto"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            variant="filled"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
          <Text whiteSpace="nowrap">per page</Text>
        </Flex> */}

        <Text color="gray.500" whiteSpace="nowrap">
          Showing {startRecord} - {endRecord} of {totalRecords}
        </Text>
      </Flex>

      <Flex alignItems="center" gap={2}>
        <ButtonGroup size="sm" spacing={1}>
          <IconButton
            icon={<FaAngleLeft />}
            aria-label="Previous page"
            isDisabled={pageNumber === 1}
            onClick={() => onPageChange?.(pageNumber - 1)}
            variant="ghost"
            _hover={{ bg: 'gray.100' }}
          />

          {generatePageNumbers().map((item) =>
            typeof item === 'number' ? (
              <Button
                key={`page-${item}`}
                onClick={() => onPageChange?.(item)}
                variant={item === pageNumber ? 'solid' : 'ghost'}
                bg={item === pageNumber ? 'blue.500' : 'transparent'}
                color={item === pageNumber ? 'white' : 'inherit'}
                _hover={{ bg: item === pageNumber ? 'blue.600' : 'gray.100' }}
                minW="40px"
                borderRadius="md"
              >
                {item}
              </Button>
            ) : (
              <Button
                key={item.id}
                variant="ghost"
                disabled
                cursor="default"
                _hover={{ bg: 'transparent' }}
                minW="40px"
              >
                ...
              </Button>
            )
          )}

          <IconButton
            icon={<FaAngleRight />}
            aria-label="Next page"
            isDisabled={pageNumber === totalPages}
            onClick={() => onPageChange?.(pageNumber + 1)}
            variant="ghost"
            _hover={{ bg: 'gray.100' }}
          />
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}

export default Paging;

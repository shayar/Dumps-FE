import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Center,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';
import { useMemo } from 'react';

interface IPagination {
  isBackendPaginated?: boolean;
  pageIndex?: number;
  table: Table<unknown>;
  pageCount?: number;
}

function Pagination({ isBackendPaginated, pageIndex, table }: IPagination) {
  const totalPage = useMemo(() => {
    return table.getPageCount();
  }, [table.getPageCount()]);

  const currentPage = useMemo(() => {
    return isBackendPaginated
      ? (pageIndex ?? 0) + 1
      : table.getState().pagination.pageIndex + 1;
  }, [isBackendPaginated, pageIndex, table.getState().pagination.pageIndex]);

  const PageNumberWrapper = (item: number, isActive?: boolean) => {
    return isActive ? (
      <Center
        h={9}
        w={9}
        bg={'primary.500'}
        borderRadius={'full'}
        color="white"
        cursor={'default'}
        fontSize={'md'}
        userSelect="none"
      >
        <Text mt={0.5}>{item}</Text>
      </Center>
    ) : (
      <Center
        h={9}
        w={9}
        _hover={{ bg: 'secondary.500', color: 'white' }}
        borderRadius={'full'}
        cursor="pointer"
        userSelect="none"
        onClick={() => {
          table.setPageIndex(item - 1);
        }}
      >
        {item}
      </Center>
    );
  };

  return (
    <Box
      display={'flex'}
      justifyContent="flex-end"
      alignItems={'center'}
      height={'50px'}
    >
      <Box marginX={'16px'}>
        <Stack direction={'row'} alignItems="center" columnGap={0}>
          <IconButton
            variant={'outline'}
            aria-label="First Page"
            borderRadius="lg"
            onClick={() => table.setPageIndex(0)}
            size="xs"
            fontSize={'lg'}
            border={'none'}
            disabled={!table.getCanPreviousPage()}
            icon={<ArrowLeftIcon />}
          />
          <IconButton
            variant={'outline'}
            aria-label="Previous Page"
            borderRadius="lg"
            onClick={() => table.previousPage()}
            size="xs"
            fontSize={'lg'}
            border={'none'}
            disabled={!table.getCanPreviousPage()}
            icon={<ArrowBackIcon />}
          />
          {currentPage != 1 && PageNumberWrapper(currentPage - 1)}
          {PageNumberWrapper(currentPage, true)}
          {currentPage < totalPage && PageNumberWrapper(currentPage + 1)}
          {totalPage < currentPage - 1 &&
            totalPage - 1 > 0 &&
            PageNumberWrapper(totalPage - 1)}

          <IconButton
            aria-label="Next Page"
            variant={'outline'}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            size="xs"
            fontSize={'lg'}
            border="none"
            icon={<ArrowForwardIcon />}
          />
          <Tooltip label={`Last Page: ${totalPage}`} placement="top">
            <IconButton
              aria-label="Last Page"
              variant={'outline'}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              size="xs"
              fontSize={'lg'}
              border="none"
              icon={<ArrowRightIcon />}
            />
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );
}

export default Pagination;

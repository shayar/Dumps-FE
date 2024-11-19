import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  Text,
  Flex,
  Button,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
interface IBreadCrumb {
  items: { name: string; route: string; isCurrentPage?: boolean }[];
  goBack?: string;
}

export const BreadCrumb = ({ items, goBack }: IBreadCrumb) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Breadcrumb
          spacing={1}
          separator={<ChevronRightIcon color="gray.500" />}
        >
          {items.map((item, i) => (
            <BreadcrumbItem key={i} isCurrentPage={item.isCurrentPage}>
              <BreadcrumbLink onClick={() => navigate(item.route)}>
                <Text fontWeight={'bold'} color={'primary.500'}>
                  {item.name}
                </Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        {goBack && (
          <Button
            size={'xs'}
            onClick={() => {
              navigate(goBack);
            }}
          >
            {t('global_goBack')}
          </Button>
        )}
      </Flex>
    </Box>
  );
};

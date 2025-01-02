import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Avatar, Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { FiSettings, FiShoppingBag, FiUser } from 'react-icons/fi';
import { UserResponse } from '@dumps/api-schemas/auth';

export default function UserLayout() {
  const location = useLocation();

  const navItems = [
    { icon: FiUser, label: 'Profile', path: '/user/profile' },
    { icon: FiShoppingBag, label: 'Orders', path: '/user/orders' },
    { icon: FiSettings, label: 'Settings', path: '/user/settings' },
  ];

  const user: UserResponse = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null;

  return (
    <Box p={[4, 6]} minH="100%">
      <Flex gap={6} flexDir={{ base: 'column', md: 'row' }}>
        {/* Sidebar */}
        <Box
          minH="100%"
          as="aside"
          w={{ base: 'full', md: '320px' }}
          borderRadius="xl"
          shadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          p={6}
        >
          <VStack spacing={6}>
            {/* Profile Section */}
            <VStack>
              <Avatar name={user && `${user.firstName} ${user.lastName}`} size="xl" />
              <Text fontWeight="medium">
                {user ? `${user.firstName} ${user.lastName}` : 'User'}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {user ? user.email : 'user@email.com'}
              </Text>
            </VStack>

            {/* Navigation */}
            <VStack as="nav" spacing={2} w="full">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  as={NavLink}
                  to={item.path}
                  leftIcon={<item.icon />}
                  variant={location.pathname === item.path ? 'solid' : 'ghost'}
                  colorScheme={location.pathname === item.path ? 'blue' : 'gray'}
                  justifyContent="flex-start"
                  w="full"
                  _activeLink={{
                    bg: 'blue.500',
                    color: 'white',
                    _hover: { bg: 'blue.600' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </VStack>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box as="main" flex={1} borderRadius="xl" shadow="rgba(0, 0, 0, 0.16) 0px 1px 4px" p={6}>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}

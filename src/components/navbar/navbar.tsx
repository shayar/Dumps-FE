/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  IconButton,
  TextProps,
  Avatar,
  Menu,
  MenuList,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { FaBars, FaCartShopping, FaDumpster, FaX } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';

import { UserResponse } from '@dumps/api-schemas/auth';
import DUMPS_COLORS from '@dumps/theme/color';

interface NavBarProps extends TextProps {
  children?: React.ReactNode;
}

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

interface MenuLinkItemProps extends TextProps {
  children: React.ReactNode;
  to?: string;
}

interface MenuLinksProps {
  isOpen: boolean;
}

function CartButton() {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => {
        navigate('cart');
      }}
      isRound
      colorScheme="white"
      aria-label="cart"
      size="md"
      icon={<FaCartShopping size="20px" />}
    />
  );
}

function LoginButton() {
  return (
    <Link to="/login">
      <Button
        size="sm"
        rounded="md"
        color="primary.500"
        bg="white"
        _hover={{
          bg: 'primary.100',
        }}
      >
        Login
      </Button>
    </Link>
  );
}

function MenuToggle({ toggle, isOpen }: MenuToggleProps) {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <FaX size="18px" /> : <FaBars size="24px" />}
    </Box>
  );
}
function MenuLinkItem({ children, to = '/', ...rest }: MenuLinkItemProps) {
  return (
    <Link to={to}>
      <Text _hover={{ textDecoration: 'underline' }} fontWeight="bold" display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
}

function MenuLinks({ isOpen }: MenuLinksProps) {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
      mr={{ base: '0', md: '20px' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={{ base: 'center', md: 'flex-end' }}
        direction={{ base: 'column', md: 'row' }}
        pt={[4, 4, 0, 0]}
      >
        <MenuLinkItem to="/">Home</MenuLinkItem>
        <MenuLinkItem to="/products">Dumps</MenuLinkItem>
        <MenuLinkItem to="/bundles">Bundles</MenuLinkItem>
        <MenuLinkItem to="/support">Support</MenuLinkItem>
      </Stack>
    </Box>
  );
}

function NavBarContainer({ children, ...props }: NavBarProps) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      bg="primary.500"
      color="white"
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="md"
      {...props}
    >
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        className="max-width-app"
        w="100%"
        px={8}
        py={4}
        mx="auto"
      >
        {children}
      </Flex>
    </Flex>
  );
}

function UserLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  if (user) {
    return (
      <Menu>
        <MenuButton>
          <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} />
        </MenuButton>
        <MenuList color={DUMPS_COLORS.gray[600]}>
          <MenuGroup>
            <Box p={3}>
              <Text textTransform="capitalize" as="b">{`${user.firstName} ${user.lastName}`}</Text>
            </Box>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => navigate('/orders')}>Orders</MenuItem>
            <MenuDivider />
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    );
  }

  return <LoginButton />;
}

function NavBar(props: NavBarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <FaDumpster size="2em" />
      {/* Desktop Navigation */}
      <Flex display={{ base: 'none', md: 'flex' }} alignItems="center" gap={4}>
        <MenuLinks isOpen={isOpen} />
        <UserLogin />
        <CartButton />
      </Flex>

      {/* Mobile Navigation */}
      <Flex display={{ base: 'flex', md: 'none' }} alignItems="center" gap={2}>
        <UserLogin />
        <CartButton />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
      </Flex>

      {/* Mobile Menu Links */}
      <Box display={{ base: 'block', md: 'none' }} width="100%">
        <MenuLinks isOpen={isOpen} />
      </Box>
    </NavBarContainer>
  );
}

export default NavBar;

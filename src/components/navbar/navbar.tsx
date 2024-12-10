/* eslint-disable react/require-default-props */
import React from 'react';
import { Box, Flex, Text, Button, Stack, IconButton, TextProps } from '@chakra-ui/react';
import { FaBars, FaCartShopping, FaDumpster, FaX } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface NavBarProps extends TextProps {
  children?: React.ReactNode;
}

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

interface MenuItemProps extends TextProps {
  children: React.ReactNode;
  to?: string;
}

interface MenuLinksProps {
  isOpen: boolean;
}

function CartButton() {
  return (
    <IconButton
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
function MenuItem({ children, to = '/', ...rest }: MenuItemProps) {
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
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/products">Dumps</MenuItem>
        <MenuItem to="/bundles">Bundles</MenuItem>
        <MenuItem to="/support">Support</MenuItem>
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

function NavBar(props: NavBarProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <FaDumpster size="2em" />
      {/* Desktop Navigation */}
      <Flex display={{ base: 'none', md: 'flex' }} alignItems="center" gap={4}>
        <MenuLinks isOpen={isOpen} />
        <LoginButton />
        <CartButton />
      </Flex>

      {/* Mobile Navigation */}
      <Flex display={{ base: 'flex', md: 'none' }} alignItems="center" gap={2}>
        <LoginButton />
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

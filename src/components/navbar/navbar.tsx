import React from 'react';
import { Box, Flex, Text, Button, Stack, IconButton } from '@chakra-ui/react';
import { FaBars, FaCartShopping, FaDumpster, FaX } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface NavBarProps {
  children?: React.ReactNode;
  [key: string]: any;
}

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

interface MenuItemProps {
  children: React.ReactNode;
  to?: string;
  [key: string]: any;
}

interface MenuLinksProps {
  isOpen: boolean;
}

const NavBar: React.FC = (props: NavBarProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <FaDumpster size={'2em'} />
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
};

const CartButton = () => (
  <IconButton
    isRound
    colorScheme="white"
    aria-label="cart"
    size="md"
    icon={<FaCartShopping size={'20px'} />}
  />
);

const LoginButton = () => (
  <Link to={'/login'}>
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

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <FaX size={'18px'} /> : <FaBars size={'24px'} />}
    </Box>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ children, to = '/', ...rest }) => {
  return (
    <Link to={to}>
      <Text _hover={{ textDecoration: 'underline' }} fontWeight={'bold'} display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks: React.FC<MenuLinksProps> = ({ isOpen }) => {
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
        <MenuItem to="/products">Certifications</MenuItem>
        <MenuItem to="/bundles">Bundles</MenuItem>
        <MenuItem to="/support">Support</MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer: React.FC<NavBarProps> = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      bg={'primary.500'}
      color={'white'}
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
};

export default NavBar;

import { Box, List, ListItem, Link } from '@chakra-ui/react';
import { NAVIGATION_ROUTES } from '@dumps/routes/routes.constant';
import { Link as RouterLink } from 'react-router-dom';
import NavItem from './NavItem';
import { navItems } from './navItemList';
import { webkit_scrollbar } from '../style';

const Sidebar = ({
  width,
  // onEnterSidebar,
  // onExitSidebar,
  isCollapsed,
  isHovered,
}: ISidebar) => {
  return (
    <Box
      // TODO: didn't know the reason behind this code
      //   position={'relative'}
      w={width}
      // TODO: i guess we need this, yet to figure out
      // maxW={width}
      bgColor={'white'}
      //TODO: can we add the color logic here in parent
      borderRight={'1px solid'}
      color={'gray.300'}
      transitionDuration={'0.6s'}
      // onMouseEnter={onEnterSidebar}
      // onMouseLeave={onExitSidebar}
      overflowY={'auto'}
      sx={{
        ...webkit_scrollbar,
        h: '100vh',
        '@supports (min-height: 100dvh)': {
          h: '100dvh',
        },
      }}
    >
      <List>
        <ListItem mx={3} my={6}>
          <Link as={RouterLink} to={NAVIGATION_ROUTES.DASHBOARD}>
            {/* PUT your project LOGO here */}
          </Link>
        </ListItem>
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            {...item}
            isCollapsed={isCollapsed && !isHovered}
          />
        ))}
      </List>
    </Box>
  );
};

interface ISidebar {
  // Todo: this can be further simplified to be fixed value
  width: string;
  // onEnterSidebar: () => void;
  // onExitSidebar: () => void;
  isCollapsed: boolean;
  isHovered: boolean;
}
export default Sidebar;

/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useMemo, useContext } from 'react';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
// import Sidebar from '@dumps/components/SideBar';
import useWindowSize from '@dumps/hooks/useWindowResize';
// import { SidebarState } from '@dumps/hooks/useContext';
import { SidebarState } from '@dumps/hooks/useContext';
import { RxHamburgerMenu } from 'react-icons/rx';
import DUMPS_COLORS from '@dumps/theme/color';
import { FaBell, FaDumpster } from 'react-icons/fa6';
import Sidebar from '../sidebar';

// Define the possible layout widths
const LAYOUT_WIDTHS = {
  LARGE: '265px',
  SMALL: '80px',
};

function Layout({ children }: ILayout) {
  const { width } = useWindowSize();
  const [showSidebar, setShowSidebar] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Update the sidebar state based on the window width
  useEffect(() => {
    if (width < 640) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
    setIsHovered(false);
  }, [width]);

  // Toggle the sidebar's collapsed state
  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  //   setIsHovered(false);
  // };

  // Calculate the current sidebar width based on its collapsed state and hovered state
  const sidebarWidth = useMemo(
    () => (showSidebar ? LAYOUT_WIDTHS.LARGE : LAYOUT_WIDTHS.SMALL),
    [showSidebar]
  );

  // Handle when the user hovers over the collapsed sidebar
  // const onEnterSidebar = () => {
  //   if (!showSidebar) {
  //     setIsHovered(true);
  //   }
  // };

  // Handle when the user stops hovering over the collapsed sidebar
  // const onExitSidebar = () => {
  //   if (isHovered) {
  //     setIsHovered(false);
  //   }
  // };

  const sidebarContextValue = useMemo(() => ({ showSidebar, setShowSidebar }), [showSidebar]);

  return (
    <>
      <Box as="nav" bg="white" display="flex" alignItems="center" justifyContent="space-between">
        <Flex
          p={3}
          width={sidebarWidth}
          alignItems="center"
          transition="all 0.6s"
          borderRight="1px solid"
          borderRightColor={DUMPS_COLORS.gray[300]}
          height="100%"
        >
          <FaDumpster size="2em" />
          {sidebarWidth !== LAYOUT_WIDTHS.SMALL && (
            <Text ml={3} fontWeight={500}>
              DUMPS
            </Text>
          )}
        </Flex>
        <Flex px={4} flex={1} alignItems="center" justifyContent="space-between">
          <Box _hover={{ cursor: 'pointer' }}>
            <RxHamburgerMenu
              fontSize={24}
              color={DUMPS_COLORS.primary['600']}
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </Box>
          <IconButton
            isRound
            colorScheme={DUMPS_COLORS.primary[600]}
            aria-label="notification"
            size="md"
            icon={<FaBell />}
            onClick={() => {}}
          />
        </Flex>
      </Box>
      <Box display="grid" gridTemplateColumns="auto 1fr">
        <Sidebar
          // onEnterSidebar={() => {}}
          // onExitSidebar={onExitSidebar}
          isHovered={isHovered}
          width={isHovered ? LAYOUT_WIDTHS.LARGE : sidebarWidth}
          isCollapsed={!showSidebar}
        />
        <Box height="100vh" maxH="100vh" overflowY="auto">
          <SidebarState.Provider value={sidebarContextValue}>
            <Box sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>{children}</Box>
          </SidebarState.Provider>
        </Box>
      </Box>
    </>
  );
}
interface ILayout {
  children: React.ReactNode;
}

export default Layout;

export function getSidebarState() {
  const sidebarOpen = useContext(SidebarState);
  return sidebarOpen as {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

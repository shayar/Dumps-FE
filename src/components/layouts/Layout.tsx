import { useState, useEffect, useMemo, useContext } from 'react';
import { Box } from '@chakra-ui/react';
// import Sidebar from '@dumps/components/SideBar';
import useWindowSize from '@dumps/hooks/useWindowResize';
// import { SidebarState } from '@dumps/hooks/useContext';
import Sidebar from '../sidebar';
import { SidebarState } from '@dumps/hooks/useContext';

// Define the possible layout widths
const LAYOUT_WIDTHS = {
  LARGE: '265px',
  SMALL: '80px',
};

const Layout = ({ children }: ILayout) => {
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
    [showSidebar],
  );

  // Handle when the user hovers over the collapsed sidebar
  const onEnterSidebar = () => {
    if (!showSidebar) {
      setIsHovered(true);
    }
  };

  // Handle when the user stops hovering over the collapsed sidebar
  const onExitSidebar = () => {
    if (isHovered) {
      setIsHovered(false);
    }
  };

  return (
    <Box display="grid" gridTemplateColumns="auto 1fr">
      <Sidebar
        onEnterSidebar={onEnterSidebar}
        onExitSidebar={onExitSidebar}
        isHovered={isHovered}
        width={isHovered ? LAYOUT_WIDTHS.LARGE : sidebarWidth}
        isCollapsed={!showSidebar}
      />
      <Box height="100vh" maxH="100vh" overflowY="auto">
        <SidebarState.Provider value={{ showSidebar, setShowSidebar }}>
          <Box
            sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
          >
            {children}
          </Box>
        </SidebarState.Provider>
      </Box>
    </Box>
  );
};

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

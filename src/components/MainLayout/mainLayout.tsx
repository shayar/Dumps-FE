import { Box } from '@chakra-ui/react';
import NavBar from '@dumps/components/navbar/navbar';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <Box width="full" bg="white">
        <Box className="max-width-app" minH="calc(100vh - 72px)" mx="auto">
          {children}
        </Box>
      </Box>
    </>
  );
}

export default MainLayout;

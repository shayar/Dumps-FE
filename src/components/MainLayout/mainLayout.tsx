import { Box } from '@chakra-ui/react';
import NavBar from '@dumps/components/navbar/navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <Box width={'full'} bg={'white'} minH={'100vh'}>
        <Box className="max-width-app" mx={'auto'}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;

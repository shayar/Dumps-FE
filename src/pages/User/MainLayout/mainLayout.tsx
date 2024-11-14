import { Box } from '@chakra-ui/react';
import NavBar from '@dumps/components/navbar/navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <Box maxW={'1920px'} mx={'auto'} bg={'white'} minH={'100vh'}>
        {children}
      </Box>
    </>
  );
};

export default MainLayout;

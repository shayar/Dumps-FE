import { Box, Spinner, Text } from '@chakra-ui/react';
import { dumps_colors } from '@dumps/theme/color';

const LoadingSpinner = () => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      height="calc(100vh - 120px)"
      maxH="calc(100vh - 120px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(5px)"
      zIndex={9999}
    >
      <Spinner size="xl" color={dumps_colors.primary[500]} />
      <Text marginTop={4}> Loading... </Text>
    </Box>
  );
};

export default LoadingSpinner;

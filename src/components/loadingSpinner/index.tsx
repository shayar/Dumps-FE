import { Box, Spinner, Text } from '@chakra-ui/react';
import DUMPS_COLORS from '@dumps/theme/color';

function LoadingSpinner() {
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
      <Spinner size="xl" color={DUMPS_COLORS.primary[500]} />
      <Text marginTop={4}> Loading... </Text>
    </Box>
  );
}

export default LoadingSpinner;

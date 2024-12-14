import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import DUMPS_COLORS from './color';

const baseStyles = {
  px: 4,
  borderRadius: '2xl',
  transition: 'all 300ms ease-in-out',
};

const primary = defineStyle({
  ...baseStyles,
  background: DUMPS_COLORS.primary[500],
  color: 'white',
  _hover: {
    background: 'primary.400',
    _disabled: {
      backgroundColor: `${DUMPS_COLORS.primary[500]} `,
    },
  },
});

const outline = defineStyle({
  ...baseStyles,
  color: DUMPS_COLORS.primary[500],
  _hover: {
    background: 'transparent',
  },
  borderColor: DUMPS_COLORS.primary[500],
});

const buttonTheme = defineStyleConfig({
  variants: {
    primary,
    outline,
  },
  sizes: {
    xs: {
      py: 1,
    },
    sm: {
      py: 2,
    },
    md: {
      py: 3,
    },
    lg: {
      py: 4,
    },
  },
  defaultProps: { variant: 'primary', size: 'lg' },
});

export default buttonTheme;

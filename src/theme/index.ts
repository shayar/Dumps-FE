import { extendTheme } from '@chakra-ui/react';
import { dumps_colors as colors } from './color';
import { buttonTheme } from './button';
import { fontSizes } from './fontsize';

export const theme = extendTheme({
  fontSizes,
  colors,
  borderRadius: {
    radii: {
      none: '0',
      sm: '0.125rem', //2px
      base: '0.25rem', //4px
      md: '0.375rem', //6px
      lg: '0.5rem', //8px
      xl: '0.75rem', //12px
      '2xl': '1rem', //16px
      '3xl': '1.5rem', //24px
      /** These are values except for those in docs */
      /* Please check if these values reflect any changes*/
      '4xl': '1.875rem', //30px
      '5xl': '2rem', //32px
      '6xl': '2.25rem', // 36px
      '7xl': '5rem', // 80px

      full: '9999px',
    },
  },
  components: {
    Button: buttonTheme,
  },
});

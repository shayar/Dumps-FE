import { extendTheme } from '@chakra-ui/react';
import DUMPS_COLORS from './color';
import buttonTheme from './button';
import fontSizes from './fontsize';

const theme = extendTheme({
  styles: {
    global: () => ({
      '.base-card': {
        margin: '16px',
        padding: '30px',
      },
      '.max-width-app': {
        maxWidth: '1280px',
      },
      body: {
        bg: '#EDF2F7',
      },
    }),
  },
  shadows: {
    base: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
  fontSizes,
  DUMPS_COLORS,
  borderRadius: {
    radii: {
      none: '0',
      sm: '0.125rem', // 2px
      base: '0.25rem', // 4px
      md: '0.375rem', // 6px
      lg: '0.5rem', // 8px
      xl: '0.75rem', // 12px
      '2xl': '1rem', // 16px
      '3xl': '1.5rem', // 24px
      /** These are values except for those in docs */
      /* Please check if these values reflect any changes */
      '4xl': '1.875rem', // 30px
      '5xl': '2rem', // 32px
      '6xl': '2.25rem', // 36px
      '7xl': '5rem', // 80px

      full: '9999px',
    },
  },
  components: {
    Button: buttonTheme,
  },
});

export default theme;

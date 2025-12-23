import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#eefcfc',
    100: '#ceeff0',
    200: '#ade2e2',
    300: '#8bd6d5',
    400: '#6ac9c8',
    500: '#0EA5A4', // Primary Teal
    600: '#0b8483',
    700: '#086362',
    800: '#054241',
    900: '#022120',
  },
  accent: {
    50: '#eefdf5',
    100: '#cbf9e0',
    200: '#a7f4cc',
    300: '#83f0b7',
    400: '#60eba3',
    500: '#22C55E', // Medical Green
    600: '#1b9e4b',
    700: '#147638',
    800: '#0e4f26',
    900: '#072713',
  },
  bg: {
    900: '#0F172A', // Deep Slate
    800: '#020617', // Surface
  }
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'bg.900' : 'gray.50',
      color: props.colorMode === 'dark' ? 'white' : 'gray.900',
    },
  }),
};

const theme = extendTheme({ config, colors, styles });

export default theme;

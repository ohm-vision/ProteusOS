'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import NextLink from 'next/link';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
    cssVariables: true,
    colorSchemes: {
        light: true,
        dark: true,
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    // components: {
    //     MuiLink: {
    //         defaultProps: {
    //             component: NextLink
    //         }
    //     }
    // }
});

export default theme;
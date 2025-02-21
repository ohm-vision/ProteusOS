import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { Container, CssBaseline, ThemeProvider } from "@mui/material";

import theme from "@/theme";
import { PublicKey } from "@/components/publicKey.component";

export const metadata: Metadata = {
  title: "ProteusOS",
  description: "Privacy. Security. Yours.",
  authors: {
      name: "Ohm Vision, Inc",
      url: "https://ohmvision.com"
  },
  appleWebApp: {
    capable: true,
    title: "My ProteusOS",
    statusBarStyle: "black"
  },
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      url: "/icons/icon-192x192.png",
      type: "image/png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: "/icons/icon-512x512.png",
      type: "image/png",
      sizes: "512x512",
    },
    {
      rel: "apple-touch-icon",
      url: "/icons/icon-192x192.png"
    },
  ],
  formatDetection: {
      telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    notranslate: true,
    googleBot: {
      index: true,
      follow: true,
      notranslate: true,
    },
  },
  // appLinks: []
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{
                  my: 2,
                  px: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  // alignItems: "center",
                  gap: 2,
                }}
                >
                {children}
                <Container
                  maxWidth="md"
                  >
                  <PublicKey />
                </Container>

              </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

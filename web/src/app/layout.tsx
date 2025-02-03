import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import { text } from "@/utils/api.util";
import { SigningKeyProvider } from "@/components/signingKey/signingKey.context";

export const metadata: Metadata = {
  title: "ProteusOS",
  description: "Privacy. Yours.",
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
  ]
  // appLinks: []
};

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const signingKey = await text.fetch("tokens/web")
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SigningKeyProvider value={signingKey}>
              {children}
            </SigningKeyProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

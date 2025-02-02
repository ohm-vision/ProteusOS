import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";

export const metadata: Metadata = {
  title: "ProteusOS",
  description: "Privacy. Yours.",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

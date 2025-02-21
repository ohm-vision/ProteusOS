import Image from "next/image";

import { AppBar, Box, Breadcrumbs, Card, CardHeader, Link, Paper, Toolbar, Typography } from "@mui/material";
import { headers } from "next/headers";
import { AppBreadcrumbs } from "@/components/portal/breadcrumbs.component";
import icon from "../../../public/icons/icon-192x192.png"


export default async function ModulesLayout({ children }: React.PropsWithChildren) {
    const headersList = await headers();


    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={1}
            flexGrow={1}
            >
            <AppBar
                position="fixed"
                >
                <Toolbar>
                    <Image src={icon} alt="logo" width={50} height={50} placeholder="blur" />
                    <Typography variant="h6" component="h1">
                        ProteusOS
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box
                position="fixed"
                display="flex"
                flexDirection="column"
                width="100vw"
                zIndex="calc(var(--mui-zIndex-appBar) - 1)"
                >
                <AppBreadcrumbs
                    pathname={headersList.get("host")}
                    />
            </Box>
            <Box><Breadcrumbs><Typography>&nbsp;</Typography></Breadcrumbs></Box>
            {children}

        </Box>
    );
}
"use client";

import { Breadcrumbs, Link, Paper, Toolbar, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useMemoAsync } from "@ohm-vision/react-async";


export function AppBreadcrumbs({ children }: React.PropsWithChildren<{ pathname?: string | null }>) {
    const pathname = usePathname();

    const resolved = useRef<Record<string, string>>({});

    const paths = useMemoAsync(async ({ signal }) => {
        const { current } = resolved;

        if (pathname === '/') return [];

        const parts = pathname.split("/").slice(1);

        for (let p = 0; p < parts.length; p++) {
            const part = parts[p];
            const href = `/${parts.slice(0, p + 1).join('/')}`;

            console.log(part, href);
            let title: string;
            if (href in current) {
                title = current[href];
            } else {
                title = current[href] = part[0].toUpperCase() + part.slice(1);
            }
        }

        return Object.entries(current);

    }, [ pathname ]);

    // const [ pathname, setPathname ] = useState(ssr);

    // useLayoutEffect(() => {
    //     setPathname(curr);
    // }, [ curr ]);

    return (
        <Paper
            elevation={0}
            >
            <Toolbar />
            {/** ensures that this is not covered by the AppBar */}
            <Breadcrumbs
                separator={<NavigateNextIcon />}
                >
                <Link underline="hover" color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home
                </Link>
                {paths?.map(([ href, name ], i, arr) => (
                    i === arr.length - 1
                        ? <Typography key={i} color="textPrimary">{name}</Typography>
                        : <Link key={i} underline="hover" color="inherit" href={href} sx={{ display: 'flex', alignItems: 'center' }}>
                            {name}
                        </Link>
                ))}
            </Breadcrumbs>
        </Paper>

    );
}
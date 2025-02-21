"use client";

import { Alert, AlertTitle, Box, Card, CardActionArea, CardHeader, IconButton, LinearProgress, Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { useAsync } from "@ohm-vision/react-async";

import { useMobile } from "@/hooks/mobile.hook";
import { ModuleApi } from "@/api/module.api";
import { isApiError } from "@/models/api.error";

export interface ModuleListProps {
    link?: boolean;
    actions?: boolean;
}

export function ModuleList({ link = true, actions = true }: ModuleListProps) {
    const [ modules, loading ] = useAsync(async ({ signal }) => {
        const api = new ModuleApi(signal);

        const result = await api.list();

        return result as Record<string, string>;
    }, []);

    const mobile = useMobile();

    if (loading) return <LinearProgress />

    if (isApiError(modules)) {
        const { error, message, statusCode } = modules;
        return <Alert severity="error">
            <AlertTitle>{statusCode} {error}</AlertTitle>
            {message}
        </Alert>
        
    }

    if (mobile) {
        return (
        <Box
            display="flex"
            flexDirection="column"
            gap={1}
            >
            {Object.entries(modules).map(([ name, source ]) => (
                <Card
                    key={name}
                    variant="outlined"
                    >
                    <CardActionArea
                        href={link ? `/modules/${name}` : "#"}
                        >
                        <CardHeader
                            title={name}
                            subheader={source}
                            slotProps={{
                                title: {
                                    variant: "h6"
                                },
                                subheader: {
                                    variant: "caption"
                                }
                            }}
                            action={actions && <IconButton>
                                <MoreHoriz />
                            </IconButton>}
                            />
                    </CardActionArea>
                </Card>
            ))}
        </Box>);
    }

    return (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Branch/Commit</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {Object.entries(modules).map(([ name, source ]) => (
                <TableRow
                    key={name}
                    >
                    <TableCell>
                        {link ? <Link href={`/modules/${name}`}>{name}</Link> : name}
                    </TableCell>
                    {source?.split("#").map(((v, i) => <TableCell key={i}>{v}</TableCell>))}
                </TableRow>
            ))}
        </TableBody>
    </Table>);
}
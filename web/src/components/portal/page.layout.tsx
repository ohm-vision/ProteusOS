import { Card, CardContent, CardHeader } from "@mui/material";

export interface PortalLayoutProps extends React.PropsWithChildren {
    title: string;
    action?: React.ReactNode;
}

export function PortalLayout({ title, action, children }: PortalLayoutProps) {

    return (
    <Card>
        <CardHeader
            title={title}
            action={action}
            />
        <CardContent
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}
            >
            {children}
        </CardContent>
    </Card>);
}

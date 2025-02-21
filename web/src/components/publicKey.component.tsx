"use client";

import { usePublicKey } from "@/data/publicKey";
import { Alert, AlertTitle } from "@mui/material";

export function PublicKey() {

    const [ key, loading ] = usePublicKey();

    if (loading) return;

    return (
        <Alert
            sx={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
                width: "100%"
            }}
            >
            <AlertTitle>Server Public Key</AlertTitle>
            {key}
        </Alert>
    );
}
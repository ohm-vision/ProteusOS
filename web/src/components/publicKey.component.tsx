
import { Alert, AlertTitle } from "@mui/material";

import { publicKey } from "@/data/publicKey";

export async function PublicKey() {

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
            {publicKey()}
        </Alert>
    );
}
import { publicKey } from "@/data/publicKey";
import { Alert, AlertTitle } from "@mui/material";

export async function PublicKey() {
    return (
        <Alert>
            <AlertTitle>Server Public Key</AlertTitle>
            {publicKey()}
        </Alert>
    );
}
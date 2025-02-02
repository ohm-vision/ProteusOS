"use client";

import { sse } from "@/utils/api.util";
import { Box, Button, Card, CardContent, CardHeader, Collapse, Container, TextField } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";

export default function NpmPage() {
    const [ name, setName ] = useState("");
    const [ installing, setInstalling ] = useState(false);
    const [ aborted, setAborted ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ events, setEvents ] = useState<string[]>([]);

    const eventSourceRef = useRef<EventSource>(undefined);
    useLayoutEffect(() => {
        return () => eventSourceRef.current?.close();
    }, [])

    async function handleInstall() {
        setEvents([ "Connecting to agent..." ])
        setAborted(false);
        setError(false);
        setInstalling(true);

        const eventSource = eventSourceRef.current = sse(`npm/install?name=${encodeURIComponent(name)}`)
        eventSource.addEventListener("open", () => {
            setEvents(prev => [...prev, "Agent connected"]);
        });
        eventSource.addEventListener("error", e => {
            setError(true);
            setEvents(prev => [...prev, "Agent Error"]);
            handleAbort();
        });
        eventSource.addEventListener("message", ({ data }) => {
            const { type, data: msg, at, error, exitCode, aborted } = JSON.parse(data);

            let text: string;
            switch (type) {
                case "start":
                    text = `Beginning installation of ${name}`;
                    break;
                case "abort":
                    text = "Aborting...";
                    break;
                case "complete":
                    if (exitCode === 0) {
                        text = `✅ process exited with code ${exitCode}`;
                    } else if (aborted) {
                        text = `✅ process aborted`;
                    } else {
                        text = `❌ process exited with code ${exitCode}`;
                    }
                    break;
                case "stderr":
                case "stdout":
                    text = `[${type}] ${msg}`;
                    break;
            }

            setEvents(prev => [...prev, text]);
        });
    }

    async function handleAbort() {
        setAborted(true);

        eventSourceRef.current?.close();
        setInstalling(false);
    }
    return (
    <Container sx={{ mt: 1 }}>
        <Card>
            <CardHeader
                title="NPM Installation Page"
                />

            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}
                >
                <TextField
                    label="Name"
                    value={name}
                    fullWidth
                    disabled={installing}
                    onChange={({ currentTarget: { value } }) => setName(value)}
                    />
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="end"
                    gap={1}
                    >
                    <Button
                        disabled={!installing || aborted}
                        onClick={handleAbort}
                        variant="contained"
                        color="warning"
                        >
                        Abort
                    </Button>
                    <Button
                        disabled={installing || !name}
                        onClick={handleInstall}
                        variant="contained"
                        color="primary"
                        >
                        Install
                    </Button>
                </Box>
                <Collapse
                    in={installing || error}
                    >
                    {events.map((v, i) => <Box key={i}>{v}</Box>)}
                    
                </Collapse>
            </CardContent>
        </Card>
    </Container>)

}
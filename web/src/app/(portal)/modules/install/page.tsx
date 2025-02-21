"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Box, Button, Collapse, TextField } from "@mui/material";

import { PortalLayout } from "@/components/portal/page.layout";
import { ModuleApi } from "@/api/module.api";

export default function Page() {
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

        const api = new ModuleApi();

        const eventSource = eventSourceRef.current = api.install(name);
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
    <PortalLayout
        title="Install"
        action={
            <Box
            display="flex"
            gap={1}
            >
            <Button
                disabled={!installing || aborted}
                onClick={handleAbort}
                color="warning"
                >
                Abort
            </Button>
            <Button
                disabled={installing || !name}
                onClick={handleInstall}
                color="primary"
                >
                Install
            </Button>
        </Box>
        }
        >
        <TextField
            label="Name"
            value={name}
            fullWidth
            disabled={installing}
            onChange={({ currentTarget: { value } }) => setName(value)}
            />
        <Collapse
            in={installing || error}
            >
            {events.map((v, i) => <Box key={i}>{v}</Box>)}
            
        </Collapse>

    </PortalLayout>);
}
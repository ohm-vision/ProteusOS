"use client";

import { json } from "@/utils/api.util";
import { Accordion, AccordionDetails, AccordionSummary, Box, LinearProgress, TextField } from "@mui/material";
import { useAsync } from "@ohm-vision/react-async";
import { JSONSchema7 } from "json-schema";

export interface ModuleFormProps {
    name: string;
}
export function ModuleForm({ name }: ModuleFormProps) {
    const [ schema, loading ] = useAsync(async ({ signal }) => {
        return await json.fetch(`npm/node_modules/${name}`).then(v => v as { make?: string[], terraform: JSONSchema7 });
    }, [ name ]);

    if (loading) return <LinearProgress />;

    const { make = [ "terraform" ], ...schemas } = schema;

    return (
        <>
            {make.map((v, i) => (
                <Config key={`${v}_${i}`} {...schemas[v]} />
            ))}
        </>
    )
}


function Config({ properties }: JSONSchema7) {
    return (<Box
        display="flex"
        flexDirection="column"
        gap={1}
        >
        {Object
            .entries(properties)
            .map(([ key, schema ]) => {
                const { type, title, description, properties } = typeof schema === "boolean" ? { type: "string" } : schema;
                switch (type) {
                    case "string": return <TextField key={key} fullWidth label={title || key} />;
                    case "object": return <Accordion
                        defaultExpanded
                        key={key}
                        variant="outlined"
                        >
                        <AccordionSummary>{title || key}</AccordionSummary>
                        <AccordionDetails>
                            <Config properties={properties || {}} />
                        </AccordionDetails>
                    </Accordion>
                }
            })}
    </Box>)
}
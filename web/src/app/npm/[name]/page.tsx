import { json } from "@/utils/api.util";
import { Accordion, AccordionSummary, Box, Card, CardHeader, Container, Step, Stepper, TextField } from "@mui/material";

export default async function ModulePage({ params: { name } }: any) {
    const { make = [ "terraform" ], ...schemas } = await json.fetch(`npm/node_modules/${name}/schema`).then(v => v as { make?: string[], terraform: Record<string, any> });

    return (
        <Container>
            {make.map((v, i) => (
                <Config key={`${v}_${i}`} {...(schemas as any)[v]} />
            ))}
        </Container>
    )
}

function Config({ properties }: { properties: Record<string, any> }) {
    return (<Box
        display="flex"
        flexDirection="column"
        >
        {Object
            .entries(properties)
            .map(([ key, { type, title, description, properties } ]) => {
                switch (type) {
                    case "string": return <TextField key={key} fullWidth label={title || key} />;
                    case "object": return <Accordion
                        defaultExpanded
                        key={key}
                        >
                        <AccordionSummary>{title || key}</AccordionSummary>
                        <Config properties={properties || {}} />
                    </Accordion>
                }
            })}
    </Box>)
}
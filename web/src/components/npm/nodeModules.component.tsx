import { json } from "@/utils/api.util";
import { Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export async function NodeModules() {
    const modules: Record<string, string> = await json.fetch("npm/node_modules");

    return <Table>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Source</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {Object.entries(modules).map(([ name, source ], i) => (
                <TableRow key={i}>
                    <TableCell><Link href={`/npm/${name}`}>{name}</Link></TableCell>
                    <TableCell>{source}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}
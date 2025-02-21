import { Button } from "@mui/material";
import { PortalLayout } from "@/components/portal/page.layout";
import { ModuleList } from "@/components/module/module.list";

export default function ModulesPage() {
    return (
    <PortalLayout
        title="Modules"
        action={
            <Button
                href="/modules/install"
                >
                Install
            </Button>
        }
        >
        <ModuleList />
    </PortalLayout>)

}
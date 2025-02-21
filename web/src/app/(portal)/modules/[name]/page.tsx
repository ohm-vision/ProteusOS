import { PortalLayout } from "@/components/portal/page.layout";
import { ModuleForm } from "@/components/module/module.form";


export default async function ModulesPage({ params }: { params: Promise<{ name: string }> } ) {
    const { name } = await params;

    // const { title, make = [ "terraform" ], ...schemas } = await json.fetch(`npm/node_modules/${name}`).then(v => v as { title?: string, make?: string[], terraform: Record<string, any> });

    return (
    <PortalLayout
        title={name}
        >
        <ModuleForm name={name} />
    </PortalLayout>
    );
}

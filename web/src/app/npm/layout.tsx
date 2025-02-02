import { NodeModules } from "@/components/npm/nodeModules.component";
import { PublicKey } from "@/components/publicKey.component";

export default function NpmLayout({ children }: React.PropsWithChildren) {
    return <>
    <PublicKey />
    {children}
    <NodeModules />
    </>
}
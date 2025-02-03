import { yup } from "../../common/utils/yup.util";

export class SshOptions {
    sshDir?: string;
    keyName?: string;
    privateKey?: string;
    publicKey?: string;

    static yupSchema() {
        return yup.model<SshOptions>({
            sshDir: yup.string().default("/root/.ssh"),
            keyName: yup.string().default("id_ed25519"),
            privateKey: yup.string(),
            publicKey: yup.string(),
        });
    }
}

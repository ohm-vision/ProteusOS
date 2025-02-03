import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { SshOptions } from "../models/ssh.options";

@Injectable()
export class SshOptionsService implements Required<SshOptions> {

    constructor(
        config: ConfigService
    ) {
        const options = SshOptions.yupSchema().validateSync({
            sshDir: config.get("SSH_DIR"),
            keyName: config.get("SSH_KEY_NAME"),
            privateKey: config.get("SSH_PRIVATE_KEY"),
            publicKey: config.get("SSH_PUBLIC_KEY"),
        } satisfies SshOptions, { stripUnknown: true, abortEarly: true });

        Object.assign(this, options);
    }
    readonly sshDir: string;
    readonly keyName: string;
    readonly privateKey: string;
    readonly publicKey: string;

    path(name: string) {
        return `${this.sshDir}/${name}`;
    }
}
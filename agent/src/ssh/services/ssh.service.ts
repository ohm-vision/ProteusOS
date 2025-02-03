import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { existsSync, readFileSync } from "fs";
import { ExecService } from "../../exec/exec.service";
import { SshOptionsService } from "./ssh-options.service";
import { writeFile } from "fs/promises";

@Injectable()
export class SshService implements OnModuleInit {
    private readonly logger = new Logger("SshService");

    constructor(
        private readonly exec: ExecService,
        private readonly options: SshOptionsService,
    ) {
    }

    private readonly env: {
        SSH_AGENT_PID?: string;
        SSH_AUTH_SOCK?: string;
    } = { };

    
    async onModuleInit() {
        // await lastValueFrom(this.exec.spawn({}, "ping", "http://web:3000"));

        const { stdout, stderr } = await this.exec.exec({ }, "ssh-agent -s");
        const [ sock, pid ] = stdout.trim().split("\n");
        this.env.SSH_AUTH_SOCK = sock.split(';')[0].split("=")[1];
        this.env.SSH_AGENT_PID = pid.split(';')[0].split("=")[1];

        const { keyName, privateKey, publicKey } = this.options;

        await this.keygen("ed25519", keyName, privateKey, publicKey);

        const key = await this.publicKey(keyName);

        this.logger.log(`Public key is ${key}`);
    }

    async keygen(type: "ed25519", name: string, privateKey?: string, publicKey?: string) {

        const filePath = this.options.path(name);
        if (existsSync(filePath)) {
            //- ensure permissions are set
            await this.exec.exec({ env: this.env }, `chmod 600 ${filePath}`);

            this.logger.verbose(`Private key ${name} already exists - skipping`);
            await this.exec.exec({ env: this.env }, `ssh-add -k ${filePath}`)
            return false;

        }

        if (privateKey && publicKey) {
            this.logger.log(`Saving ${type} private key from config (${name})`);
            await writeFile(filePath, privateKey, { encoding: "utf-8" });
            await writeFile(`${filePath}.pub`, publicKey, { encoding: "utf-8" });
        } else {
            this.logger.log(`Generating ${type} private key (${name})`);
            await this.exec.exec({ env: this.env }, `ssh-keygen -t ${type} -f ${filePath} -N ""`);
        }

        return true;
    }

    async publicKey(name: string = this.options.keyName) {
        return readFileSync(`${this.options.path(name)}.pub`).toString("utf-8").trim();
    }

    async privateKey(name: string = this.options.keyName) {
        return readFileSync(`${this.options.path(name)}`).toString("utf-8").trim();
    }
}
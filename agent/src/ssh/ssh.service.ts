import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { existsSync, readFile, readFileSync } from "fs";
import { lastValueFrom } from "rxjs";
import { ExecService } from "src/exec/exec.service";

@Injectable()
export class SshService implements OnModuleInit {
    private readonly logger = new Logger("SshService");

    private readonly sshPath = "/root/.ssh";
    private readonly keyName = "id_ed25519";

    constructor(
        private readonly exec: ExecService
    ) {}

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

        await this.keygen("ed25519");

        const key = await this.publicKey(this.keyName);

        this.logger.log(`Public key is ${key}`);
    }

    async keygen(type: "ed25519", name: string = `id_${type}`) {

        const filePath = this.path(name);
        if (existsSync(filePath)) {
            //- ensure permissions are set
            await this.exec.exec({ env: this.env }, `chmod 600 ${filePath}`);

            this.logger.verbose(`Private key ${name} already exists - skipping`);
            await this.exec.exec({ env: this.env }, `ssh-add -k ${filePath}`)
            return false;

        }

        this.logger.log(`Generating ${type} private key (${name})`);
        await this.exec.exec({ env: this.env }, `ssh-keygen -t ${type} -f ${filePath} -N ""`);

        return true;
}

    async publicKey(name: string = this.keyName) {
        return readFileSync(`${this.path(name)}.pub`).toString("utf-8").trim();
    }

    async privateKey(name: string) {
        return readFileSync(`${this.path(name)}`).toString("utf-8").trim();
    }

    private path(name: string) {
        return `${this.sshPath}/${name}`;
    }
}
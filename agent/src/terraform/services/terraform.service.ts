import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ExecOptions, SpawnOptionsWithoutStdio } from "child_process";
import { ExecService } from "../../exec/exec.service";
import { lastValueFrom } from "rxjs";

const command = "terraform" as const;

@Injectable()
export class TerraformService implements OnModuleInit {
    private readonly logger = new Logger("TerraformService");

    constructor(
        private readonly sh: ExecService,
    ) {}

    async onModuleInit() {

        const { stdout, stderr } = await this.exec({}, "version");

        if (stderr) {
            //- todo: attempt auto-install?
            this.logger.error(stderr.trim());
            return;
        }

        this.logger.verbose(`✅ ${stdout.replace(/[\r\n]/g, " ").trim()}`);

        // await this.exec({}, "init").then(v => console.log(v));
    }

    private spawn(options: SpawnOptionsWithoutStdio, ...args: string[]) {
        return this.sh.spawn({ ...options, env: { TF_CLI_ARGS: "-no-color" } }, command, ...args)
    }

    private exec(options: ExecOptions, args: string = "") {
        return this.sh.exec({ ...options, env: { TF_CLI_ARGS: "-no-color" } }, `${command} ${args}`.trim());
    }

}
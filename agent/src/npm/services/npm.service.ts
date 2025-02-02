import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ExecOptions, SpawnOptions, SpawnOptionsWithoutStdio } from 'child_process';
import { from, lastValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { ExecService } from 'src/exec/exec.service';

export type SpawnEvent<Type extends string = string, Metadata extends object = {}> = Metadata & { type: Type; at: Date | number; };

export type SpawnEvents =
    SpawnEvent<"stdout" | "stderr", { data: string }> |
    SpawnEvent<"complete", { exitCode: number, aborted?: boolean }> |
    SpawnEvent<"error", { error: Error }> |
    SpawnEvent<"abort" | "start">;

const command = "npm" as const;

@Injectable()
export class NpmService implements OnModuleInit {
    readonly logger = new Logger("NpmService");
    readonly command = "npm" as const;


    constructor(
        private readonly sh: ExecService
    ) {
        
    }

    async onModuleInit() {
        const { stdout, stderr } = await this.exec({}, "--version");

        if (stderr) {
            //- todo: attempt auto-install?
            this.logger.error(stderr.trim());
        }
        else {
            this.logger.verbose(`✅ ${command} v${stdout.replace(/[\r\n]/g, " ").trim()}`)
        }

        // const ctrl = new AbortController();

        // this.logger.log("Attempting to start install");

        // await lastValueFrom(this.spawn(ctrl.signal, "install"));
    }

    async node_modules() {
        const { stderr, stdout } = await this.sh.exec({}, "cat package.json");

        if (stderr) {
            throw new Error(stderr?.trim());
        }

        const { dependencies } = JSON.parse(stdout.trim());

        return dependencies;
    }

    private readonly url = /(?:git@|https:\/\/)(?:[^:/]+)[:\/]([^/]+)\/([^/.]+)/;
    install(name: string, signal: AbortSignal) {
        const npm = this.spawn({ signal }, "install", name);

        lastValueFrom(npm).then(async v => {
            if (v.type === "complete" && v.exitCode === 0) {
                //- check status of install

                const packageName = this.url.test(name) ? this.url.exec(name)[2] : name;

                this.logger.log(`Attempting to validate ${packageName}`);

            }
        });


        return npm;
    }

    private exec(options: ExecOptions = {}, args: string) {
        return this.sh.exec(options, `${command} ${args}`.trim());
    }

    private spawn(options: SpawnOptionsWithoutStdio, ...args: string[]) {
        return this.sh.spawn(options, command, ...args);
    }
}

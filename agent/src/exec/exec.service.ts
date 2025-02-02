import { Injectable, Logger } from '@nestjs/common';
import { spawn, exec as _exec, SpawnOptionsWithoutStdio, ExecOptions } from 'child_process';
import { Observable } from 'rxjs';
import { promisify } from 'util';

const exec = promisify(_exec);

export type SpawnEvent<Type extends string = string, Metadata extends object = {}> = Metadata & { type: Type; at: Date | number; };

export type SpawnEvents =
    SpawnEvent<"stdout" | "stderr", { data: string }> |
    SpawnEvent<"complete", { exitCode: number, aborted?: boolean }> |
    SpawnEvent<"error", { error: Error }> |
    SpawnEvent<"abort" | "start">;

@Injectable()
export class ExecService {
    private readonly spawnOptions: SpawnOptionsWithoutStdio = { cwd: "/modules", stdio: "pipe", detached: false } as const;
    private readonly execOptions: ExecOptions = { cwd: "/modules" } as const;

    exec(options: ExecOptions, command: string) {
        const logger = new Logger(command.trim());

        const { signal } = options;

        return exec(command, { ...this.execOptions, ...options })
            .then(({ stderr, stdout }) => {
                if (signal?.aborted) {
                    logger.debug(`aborted`);
                } else {
                    logger.debug(`exitCode = 0`);
                }

                return { stderr, stdout };
            })
            .catch(e => {
                logger.error(`❌ ${e}`);
                throw e;
            });

    }

    spawn(options: SpawnOptionsWithoutStdio, command: string, ...args: string[]) {
        const logger = new Logger(`${command} ${args.join(' ')}`.trim());

        const { signal } = options;

        return new Observable<SpawnEvents>((events) => {
            if (signal?.aborted) {
                logger.error(`signal is already aborted`);
                events.next({ type: "error", error: new Error(`signal is already aborted`), at: Date.now() });
                events.complete();
                return;
            }
            logger.log(`starting`);
            events.next({ type: "start", at: Date.now() });
    
            const npm = spawn(command, args, { ...this.spawnOptions, ...options });
    
            const handleAbort = () => {
                signal?.removeEventListener("abort", handleAbort);
                logger.verbose("received abort signal");
                events.next({ type: "abort", at: Date.now() });
                // npm.kill("SIGTERM");
                // setTimeout(() => npm.kill('SIGKILL'), 5000); // Force kill if not terminated in 5 seconds
            };
    
            signal?.addEventListener("abort", handleAbort);
    
            npm.stdout.on("data", data => {
                const msg: string = data.toString();
    
                logger.debug(msg?.trim());
                events.next({ type: "stdout", data: msg, at: Date.now() });
            });
            npm.stderr.on("data", data => {
                const msg: string = data.toString();
    
                logger.warn(msg?.trim());
                events.next({ type: "stderr", data: msg, at: Date.now() });
            });
    
            let closed = false;
            npm.on("close", exitCode => {
                if (closed) {
                    return;
                }

                closed = true;
                signal?.removeEventListener("abort", handleAbort);

                const aborted = exitCode === null && signal?.aborted;

                events.next({ type: "complete", exitCode, aborted, at: Date.now() });

                if (exitCode === 0) {
                    logger.debug(`exitCode = ${exitCode}`)
                } else if (aborted) {
                    logger.debug("aborted")
                } else {
                    logger.error(`❌ exitCode = ${exitCode}`)
                }

                events.complete();
            });
    
            npm.on("error", (err) => {
                // events.next({ type: "error", error: err, at: Date.now() });
                if (signal.aborted && `${err}` === "AbortError: The operation was aborted") {
                    return;
                }
                logger.error(`❌ ${err}`);
                events.error(err);
            });
        });
    }
}

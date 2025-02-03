import { Module } from "@nestjs/common";
import { ExecModule } from "../exec/exec.module";

import { SshController } from "./ssh.controller";

import { SshService } from "./services/ssh.service";
import { SshOptionsService } from "./services/ssh-options.service";

@Module({
    imports: [
        ExecModule
    ],
    controllers: [ SshController ],
    providers: [ SshService, SshOptionsService ],
    exports: [ SshService ],
})
export class SshModule {

}
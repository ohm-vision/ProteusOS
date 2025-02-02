import { Module } from "@nestjs/common";
import { SshService } from "./ssh.service";
import { ExecModule } from "src/exec/exec.module";
import { SshController } from "./ssh.controller";

@Module({
    imports: [
        ExecModule
    ],
    controllers: [ SshController ],
    providers: [ SshService ],
    exports: [],
})
export class SshModule {

}
import { Global, Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";
import { SshModule } from "src/ssh/ssh.module";

@Global()
@Module({
    imports: [
        SshModule
    ],
    controllers: [TokenController],
    providers: [ TokenService ],
    exports: [ TokenService ]
})
export class TokenModule {}

import { Injectable, Module } from "@nestjs/common";
import { createHmac, randomBytes } from "crypto";
import { SshService } from "src/ssh/services/ssh.service";

@Injectable()
export class TokenService {

    constructor(
        private readonly ssh: SshService
    ) {}

    //- todo: back this up somewhere
    private memory: Record<string, string> = {};

    async getOrAdd(name: string, rotate?: boolean) {
        if (!rotate && name in this.memory) {
            return this.memory[name];
        }

        const privateKey = await this.ssh.privateKey();

        const token = randomBytes(32).toString("hex");

        return this.memory[name] = createHmac("sha256", privateKey).update(`${name}-${token}`).digest("hex");
    }

    verify(name: string, signature: string, payload: string) {
        const signingKey = this.memory[name];

        if (!signingKey) return false;

        const computedSignature = createHmac("sha256", signingKey).update(payload).digest("hex");

        return signature === computedSignature;
    }
}
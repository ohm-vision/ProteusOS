import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { InternalOnly } from "../common/internal.guard";

import { SshService } from "./ssh.service";

@Controller("ssh")
export class SshController {
    constructor(
        private readonly service: SshService
    ) {

    }

    @Get("publicKey")
    async publicKey(
        @Req() req: Request
    ) {
        if (InternalOnly.isInternal(req)) {
            const publicKey = await this.service.publicKey();

            return publicKey;
        }

        return "************* SSH PUBLIC KEY IS ONLY AVAILABLE LOCALLY ************";
    }
}
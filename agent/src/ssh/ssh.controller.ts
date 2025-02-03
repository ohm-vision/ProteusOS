import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { InternalOnly } from "../common/internal.guard";

import { SshService } from "./services/ssh.service";

@Controller("ssh")
export class SshController {
    constructor(
        private readonly service: SshService
    ) {

    }

    @Get("publicKey")
    async publicKey() {
        return await this.service.publicKey();
    }
}
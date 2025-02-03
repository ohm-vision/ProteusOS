import { Controller, Get, Query, Req, Sse, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { map } from "rxjs";

import { InternalOnly } from "../../common/internal.guard";

import { NpmService } from "../services/npm.service";

@Controller("npm")
export class NpmController {

    constructor(
        private readonly service: NpmService
    ) {}

    @Sse("install")
    install(
        @Query("name") name: string,
        @Req() request: Request
    ) {
        const ctrl = new AbortController();

        request.on("close", () => ctrl.abort());

        return this.service.install(name, ctrl.signal).pipe(map(v => ({ type: "message", data: v })));
    }
}
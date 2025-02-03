import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { InternalOnly } from "src/common/internal.guard";
import { TokenService } from "./token.service";

@Controller("tokens")
export class TokenController {

    constructor(
        private readonly service: TokenService
    ) {}

    @Get(":name")
    @UseGuards(InternalOnly)
    getOrAdd(
        @Param("name") name: string,
        @Query("rotate") rotate: string
    ) {
        return this.service.getOrAdd(name, rotate === "1");
    }

}
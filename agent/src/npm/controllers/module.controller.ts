import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { NpmModuleService } from "../services/module.service";
import { InternalOnly } from "src/common/internal.guard";

@Controller("npm/node_modules")
export class NpmModuleController {

    constructor(
        private readonly service: NpmModuleService
    ) {}

    @Get()
    @UseGuards(InternalOnly)
    list() {
        return this.service.list();
    }

    @Get(":name/schema")
    schema(
        @Param("name") name: string
    ) {
        return this.service.schema(name);
    }

}
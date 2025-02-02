import { Injectable, NotFoundException } from "@nestjs/common";
import { NpmService } from "./npm.service";
import { readFile } from "fs/promises";

@Injectable()
export class NpmModuleService {

    constructor(
        private readonly npm: NpmService
    ) {}

    list() {
        return this.npm.node_modules();
    }

    async schema(name: string) {
        const modules = await this.list();

        if (!(name in modules)) {
            throw new NotFoundException(name);
        }

        return await readFile(`/modules/node_modules/${name}/proteus.json`, { encoding: "utf-8" });
    }
}
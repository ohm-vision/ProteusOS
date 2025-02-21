import { json, sse } from "@/utils/api.util";
import { JSONSchema7 } from "json-schema";

export class ModuleApi {
    private readonly path = "npm/node_modules";
    constructor(
        private readonly signal?: AbortSignal
    ) {

    }

    list() : Promise<Record<string, string>> {
        return json.fetch(this.path, { signal: this.signal });
    }

    getByName(name: string) : Promise<{ make: string[], terraform?: JSONSchema7 }> {
        return json.fetch(`${this.path}/${name}`, { signal: this.signal });
    }

    install(name: string) {
        return sse(`npm/install?name=${encodeURIComponent(name)}`)
    }
}
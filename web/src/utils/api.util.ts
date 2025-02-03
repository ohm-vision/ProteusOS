import { createHmac } from "crypto";

export const local = process.env.API_ENDPOINT;

const ResponseTypes = [ "text", "json", "arrayBuffer", "blob", "bytes", "formData" ] as const;

type ResponseType = typeof ResponseTypes[number];

export class Api {
    readonly host?: string = local || "";
    private readonly prefix: string;

    constructor(
        private readonly type: ResponseType = "json",
        prefix?: string,
    ) {
        this.prefix = prefix ? `/${prefix}` : "";
    }

    async fetch(endpoint: string = "", { signingKey, ...init }: RequestInit & { signingKey?: string | false } = {}) {
        const url = `${this.host}/api${this.prefix}/${endpoint}`;

        const res = await fetch(url, {
            ...init,
            headers: {
                ...(signingKey ? {
                    "x-client-id": "web",
                    "x-signature": createHmac("sha256", signingKey).update(init.body ? JSON.stringify(init.body) : url).digest("hex")
                } : {}),
                ...init?.headers || {}
            }
        });

        return await res[this.type].apply(res);
    }
}

export const json = new Api("json");

export const text = new Api("text");

export function sse(url: string, init?: EventSourceInit) {
    return new EventSource(`${local || ""}/api/${url}`, init);
}

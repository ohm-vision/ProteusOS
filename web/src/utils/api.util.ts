import { createHmac } from "crypto";

const ResponseTypes = [ "text", "json", "arrayBuffer", "blob", "bytes", "formData" ] as const;

const host = `${process.env.NEXT_PUBLIC_API_ENDPOINT || ""}`;

function getHost() {
    if (global.window?.location !== undefined) {
        return "";
    }

    return host;
}

export type ResponseType = typeof ResponseTypes[number];

export class Api {
    private readonly prefix: string;

    constructor(
        private readonly type: ResponseType = "json",
        prefix?: string,
    ) {
        if (!ResponseTypes.includes(type)) throw new Error(`Response Type ${type} invalid`);

        this.prefix = prefix ? `/${prefix}` : "";
    }

    async fetch(endpoint: string = "", { signingKey, ...init }: RequestInit & { signingKey?: string | false } = {}) {
        const url = `${getHost()}/api${this.prefix}/${endpoint}`;

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
    return new EventSource(`${getHost()}/api/${url}`, init);
}

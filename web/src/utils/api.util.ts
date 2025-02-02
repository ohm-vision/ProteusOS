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

    async fetch(endpoint?: string, init?: RequestInit) {
        const res = await fetch(`${this.host}/api${this.prefix}/${endpoint}`, init);

        return await res[this.type].apply(res);
    }
}

export const json = new Api("json");

export const text = new Api("text");

export function sse(url: string, init?: EventSourceInit) {
    return new EventSource(`${local || ""}/api/${url}`, init);
}

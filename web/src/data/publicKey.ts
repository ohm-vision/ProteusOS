import { text } from "@/utils/api.util";

/**
 * This method performs a backend server-call to fetch the public key from the server
 * @returns 
 */
export async function publicKey(signal?: AbortSignal) {
    return await text.fetch("ssh/publicKey", { signal });
}
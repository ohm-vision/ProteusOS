import { text } from "@/utils/api.util";
import { useAsync } from "@ohm-vision/react-async";
import { DependencyList } from "react";

/**
 * This method performs a backend server-call to fetch the public key from the server
 * @returns 
 */
export function usePublicKey(...deps: DependencyList) {
    return useAsync(async ({ signal }) => {
            try {
                return await text.fetch("ssh/publicKey", { signal });
            } catch (e) {
                return "error"
            }
        }, deps);
}
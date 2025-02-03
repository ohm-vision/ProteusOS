"use client";

import { createContext, useContext } from "react";

const SigningKeyContext = createContext<string>("");
SigningKeyContext.displayName = "signingKey";

export default SigningKeyContext;

export function useSigningKey() {
    return useContext(SigningKeyContext);
}

export function SigningKeyProvider({ value, children }: React.PropsWithChildren<{ value: string }>) {

    return <SigningKeyContext.Provider value={value}>{children}</SigningKeyContext.Provider>

}
'use client';
import {createContext, useContext, useState} from "react";

const SignatureContext = createContext<any>(undefined);

export function SignatureWrapper({children} : {
    children: React.ReactNode
}) {
    const [signatureGlobal, setSignatureGlobal] = useState("Undefined")

    return (
        <SignatureContext.Provider value = {{
            signatureGlobal,
            setSignatureGlobal
        }}>
            {children}
        </SignatureContext.Provider>
    )
}

export function useSignatureContext() {
    return useContext(SignatureContext)
}
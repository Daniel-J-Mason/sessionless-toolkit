'use client';
import {createContext, useContext, useState} from "react";

const PublicKeyContext = createContext<any>(undefined);

export function PublicKeyWrapper({children} : {
    children: React.ReactNode
}) {
    const [publicKeyGlobal, setPublicKeyGlobal] = useState("")

    return (
        <PublicKeyContext.Provider value = {{
            publicKeyGlobal,
            setPublicKeyGlobal
        }}>
            {children}
        </PublicKeyContext.Provider>
    )
}

export function usePublicKeyContext() {
    return useContext(PublicKeyContext)
}
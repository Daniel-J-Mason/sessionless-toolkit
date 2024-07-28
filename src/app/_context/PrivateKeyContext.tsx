'use client';
import {createContext, useContext, useState} from "react";

const PrivateKeyContext = createContext<any>(undefined);

export function PrivateKeyWrapper({children} : {
    children: React.ReactNode
}) {
    const [privateKeyGlobal, setPrivateKeyGlobal] = useState("Loading...")

    return (
        <PrivateKeyContext.Provider value = {{
            privateKeyGlobal,
            setPrivateKeyGlobal
        }}>
            {children}
        </PrivateKeyContext.Provider>
    )
}

export function usePrivateKeyContext() {
    return useContext(PrivateKeyContext)
}
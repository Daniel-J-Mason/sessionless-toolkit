'use client';
import {createContext, useContext, useState} from "react";

const MessageContext = createContext<any>(undefined);

export function MessageWrapper({children} : {
    children: React.ReactNode
}) {
    const [messageGlobal, setMessageGlobal] = useState("")

    return (
        <MessageContext.Provider value = {{
            messageGlobal,
            setMessageGlobal
        }}>
            {children}
        </MessageContext.Provider>
    )
}

export function useMessageContext() {
    return useContext(MessageContext)
}
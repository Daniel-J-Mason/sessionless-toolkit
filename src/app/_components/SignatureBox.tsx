'use client';

import {ChangeEvent} from "react";
import {usePrivateKeyContext} from "@/app/_context/PrivateKeyContext";
import {invoke} from "@tauri-apps/api/tauri";
import CopyToClipBoardButton from "@/app/_components/CopyLabel";
import {useSignatureContext} from "@/app/_context/SignatureContext";
import {useMessageContext} from "@/app/_context/MessageContext";

export default function SignatureBox() {

    const {signatureGlobal, setSignatureGlobal} = useSignatureContext();
    const {messageGlobal, setMessageGlobal} = useMessageContext();
    const {privateKeyGlobal} = usePrivateKeyContext()

    function sign_message() {
        invoke<string>('sign_message', {privateKey: privateKeyGlobal, message: messageGlobal})
            .then(result => {
                setSignatureGlobal(result)
            })
            .catch(console.error);
    }

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setMessageGlobal(event.target.value)
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <button onClick={sign_message}>Sign message</button>
            <textarea value={messageGlobal} onChange={handleChange}/>
            <CopyToClipBoardButton labelText={"Signature:"} labelValue={signatureGlobal}/>
        </div>
    )
}
'use client';

import {ChangeEvent, useState} from "react";
import {usePrivateKeyContext} from "@/app/_context/PrivateKeyContext";
import {invoke} from "@tauri-apps/api/tauri";
import CopyToClipBoardButton from "@/app/_components/CopyLabel";

export default function MessageBox() {

    const [signature, setSignature] = useState("Undefined");
    const [message, setMessage] = useState("");
    const {privateKeyGlobal, setPrivateKeyGlobal} = usePrivateKeyContext()

    function sign_message() {
        invoke<string>('sign_message', {privateKey: privateKeyGlobal, message: signature})
            .then(result => {
                setSignature(result)
            })
            .catch(console.error);
    }

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setMessage(event.target.value)
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <button onClick={sign_message}>Sign message</button>
            <textarea value={message} onChange={handleChange}/>
            <CopyToClipBoardButton labelText={"Signature:"} labelValue={signature}/>
        </div>
    )
}
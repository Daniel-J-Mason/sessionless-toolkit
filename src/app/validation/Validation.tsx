'use client';

import {usePublicKeyContext} from "@/app/_context/PublicKeyContext";
import {useMessageContext} from "@/app/_context/MessageContext";
import {useSignatureContext} from "@/app/_context/SignatureContext";
import {ChangeEvent, useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import TextAreaWithLabel from "@/app/_components/TextAreaWithLabelProps";

export default function Validation() {
    const {publicKeyGlobal} = usePublicKeyContext();
    const {messageGlobal} = useMessageContext();
    const {signatureGlobal} = useSignatureContext();

    const [publicKey, setPublicKey] = useState("");
    const [message, setMessage] = useState("");
    const [signature, setSignature] = useState("");

    const [isValid, setIsValid] = useState(false)
    const [validationResult, setValidationResult] = useState("Unchecked");

    const pasteGlobals = () => {
        setPublicKey(publicKeyGlobal);
        setMessage(messageGlobal);
        setSignature(signatureGlobal);
    }

    const clearAll = () => {
        setPublicKey("");
        setMessage("");
        setSignature("");
    }

    function validate() {
        invoke<boolean>('verify', {publicKey, signature, message})
            .then(result => {
                setIsValid(result);
                setValidationResult(result ? "Signature is valid" : "Signature is invalid");
            })
            .catch(console.error)
    }

    useEffect(() => {
        setValidationResult("Signature is unchecked");
    }, [publicKey, message, signature])

    return (

        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "20px",
            alignItems: "center",
            gap: "10px"
        }}>
            <div style={{display: 'flex', justifyContent: 'center', maxWidth: '400px'}}>
                <button onClick={() => pasteGlobals()}>
                    Paste Generated Values
                </button>
                <button onClick={() => clearAll()}>
                    Clear All
                </button>
            </div>
            <TextAreaWithLabel
                label="PublicKey:"
                value={publicKey}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setPublicKey(event.target.value)}
            />
            <TextAreaWithLabel
                label="Message:"
                value={message}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setMessage(event.target.value)}
            />
            <TextAreaWithLabel
                label="Signature:"
                value={signature}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setSignature(event.target.value)}
            />
            <button onClick={() => validate()}>
                Validate
            </button>
            <label
                style={{
                    backgroundColor:
                        validationResult === "Signature is valid" ? 'green' :
                            validationResult === "Signature is invalid" ? 'red' :
                                "",
                    color:
                        validationResult === "Signature is valid" || validationResult === "Signature is invalid" ? 'white' :
                            "",
                    padding: '0.5em'
                    // You may want to use contrasting color for readability
                }}>
                {validationResult}
        </label>

</div>
)
}
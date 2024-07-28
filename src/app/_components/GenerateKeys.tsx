'use client';

import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import CopyToClipBoardButton from "@/app/_components/CopyLabel";
import {usePrivateKeyContext} from "@/app/_context/PrivateKeyContext";

export default function GenerateKeys() {
    const [publicKey, setPublicKey] = useState("Loading...");
    const {privateKeyGlobal ,setPrivateKeyGlobal} = usePrivateKeyContext();

    function generateKeys() {
        invoke<[string, string]>('generate_keys')
            .then(result => {
                setPrivateKeyGlobal(result[0]);
                setPublicKey(result[1]);
            })
            .catch(console.error);
    }

    useEffect(() => {
        generateKeys()
    }, []);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <button onClick={generateKeys}>Generate Keys</button>
            <div>
                <CopyToClipBoardButton labelText={"Private Key: "} labelValue={privateKeyGlobal || "Loading..."}/>
                <CopyToClipBoardButton labelText={"Public Key: "} labelValue={publicKey || "Loading..."}/>
            </div>
        </div>
    )
};

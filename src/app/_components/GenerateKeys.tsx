'use client';

import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import CopyToClipBoardButton from "@/app/_components/CopyLabel";

export default function GenerateKeys() {
    const [keys, setKeys] = useState(["", ""]);

    function generateKeys() {
            invoke<[string, string]>('generate_keys')
                .then(result => setKeys(result))
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
                <CopyToClipBoardButton labelText={"Private Key: " + keys[0] || "Loading..."}/>
                <CopyToClipBoardButton labelText={"Public Key: " + keys[1] || "Loading..."}/>
            </div>
        </div>
    )
};

'use client';

import {invoke} from "@tauri-apps/api/tauri";
import CopyToClipBoardButton from "@/app/_components/CopyLabel";
import {usePrivateKeyContext} from "@/app/_context/PrivateKeyContext";
import {usePublicKeyContext} from "@/app/_context/PublicKeyContext";

export default function GenerateKeys() {
    const {publicKeyGlobal, setPublicKeyGlobal} = usePublicKeyContext();
    const {privateKeyGlobal, setPrivateKeyGlobal} = usePrivateKeyContext();

    function generateKeys() {
        invoke<[string, string]>('generate_keys')
            .then(result => {
                setPrivateKeyGlobal(result[0]);
                setPublicKeyGlobal(result[1]);
            })
            .catch(console.error);
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <button onClick={generateKeys}>Generate Keys</button>
            <div>
                <CopyToClipBoardButton labelText={"Private Key: "} labelValue={privateKeyGlobal || ""}/>
                <CopyToClipBoardButton labelText={"Public Key: "} labelValue={publicKeyGlobal || ""}/>
            </div>
        </div>
    )
};

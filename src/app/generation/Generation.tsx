'use client';

import GenerateKeys from "@/app/_components/GenerateKeys";
import EpochMilli from "@/app/_components/EpochMilli";
import SignatureBox from "@/app/_components/SignatureBox";

export default function Generation() {
    return (
        <main style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: "20px"
        }}>
            <GenerateKeys/>
            <EpochMilli/>
            <SignatureBox/>
        </main>
    );
}
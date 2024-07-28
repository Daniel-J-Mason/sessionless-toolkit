'use client';

import {useEffect, useState} from "react";
import CopyToClipBoardButton from "@/app/_components/CopyLabel";

export default function EpochMilli() {
    const [time, setTime] = useState("Loading...")

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now().toString());
        }, 1000); // Update every 1 second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <CopyToClipBoardButton labelText={"Current Epoch Milli: "} labelValue={time}/>
    )
}
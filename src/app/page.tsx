'use client';
import Generation from "@/app/generation/Generation";
import {useState} from "react";
import Validation from "@/app/validation/Validation";

export default function Home() {
    const [activeTab, setActiveTab] = useState('Generation');

    const handleTab = (tabName: string) => {
        setActiveTab(tabName);
    }


    return (
        <main style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100vh",
            paddingTop: "30px"
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '200px' }}>
                <button onClick={() => handleTab('Generation')}>
                    Generation
                </button>
                <button onClick={() => handleTab('Validation')}>
                    Validation
                </button>
            </div>
            {activeTab === 'Generation' && <div><Generation/></div>}
            {activeTab === 'Validation' && <div><Validation/></div>}
        </main>
    );
}

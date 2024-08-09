import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {PrivateKeyWrapper} from "@/app/_context/PrivateKeyContext";
import {PublicKeyWrapper} from "@/app/_context/PublicKeyContext";
import {MessageWrapper} from "@/app/_context/MessageContext";
import {ContextProviderComposer} from "@/app/_context/ContextProviderComposer";
import {SignatureWrapper} from "@/app/_context/SignatureContext";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Sessionless Toolkit",
    description: "Gui for working with sessionless protocol",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const components = [
        PrivateKeyWrapper,
        PublicKeyWrapper,
        MessageWrapper,
        SignatureWrapper,
    ]

    return (
        <html lang="en">
        <ContextProviderComposer components = {components}>
            <body className={inter.className}>{children}</body>
        </ContextProviderComposer>
        </html>
    );
}

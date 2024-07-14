import { Anuphan } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

const anuphan = Anuphan({
    subsets: ["latin"],
    variable: "--font-anuphan",
    weight: ["200", "300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata = {
    title: "Intania OIDC",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-dvh bg-background-gradient font-sans antialiased",
                    anuphan.variable,
                )}
            >
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}

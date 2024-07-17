import { Anuphan } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

const anuphan = Anuphan({
    subsets: ["latin"],
    variable: "--font-anuphan",
    weight: ["200", "300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata = {
    title: "เข้าสู่ระบบ - Intania Accounts",
    icons: [{ rel: "icon", url: "/favicon.svg" }],
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
                <Toaster />
            </body>
        </html>
    );
}

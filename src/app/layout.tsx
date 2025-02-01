import { IBM_Plex_Sans_Thai } from "next/font/google";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Background from "@/components/common/background";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    variable: "--font-ibm-plex-sans-thai",
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
        <html lang="th" className={cn(ibmPlexSansThai.className)}>
            <body>
                <section className="mx-auto min-h-dvh max-w-screen-md antialiased">
                    {children}
                </section>
                <Toaster />
                <Background />
            </body>
        </html>
    );
}

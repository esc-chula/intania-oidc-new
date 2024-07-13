import "@/styles/globals.css";

import { Anuphan } from "next/font/google";

export const anuphan = Anuphan({
    subsets: ["latin"],
    variable: "--font-anuphan",
    weight: ["200", "300", "400", "500", "600", "700"],
    display: "swap",
});

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import ESCLogoWithoutText from "@/components/esc/ESCLogoWithoutText";

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
                <div className="pointer-events-none relative -z-50 h-dvh w-dvw select-none overflow-hidden">
                    <ESCLogoWithoutText
                        className="absolute -bottom-[30dvh] -right-[10dvw] -z-50 w-[60dvw] rotate-[-12deg]"
                        fill={"hsla(0, 0%, 0%, 0.03)"}
                    />
                    <div className="absolute left-0 top-0 -z-50 size-[150dvw] -translate-x-1/2 -translate-y-2/3 bg-background-gradient-prop opacity-20" />
                    <div className="absolute left-0 top-0 -z-50 size-[80dvw] -translate-x-2/3 -translate-y-[90%] bg-background-gradient-prop" />
                </div>
            </body>
        </html>
    );
}

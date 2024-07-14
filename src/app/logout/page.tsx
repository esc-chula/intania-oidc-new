"use client";

import { useEffect } from "react";
import { logout } from "./actions";

export default function Login() {
    useEffect(() => {
        logout().catch(console.error);
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            Loging out...
        </main>
    );
}

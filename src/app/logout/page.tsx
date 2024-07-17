"use client";

import { logoutStudent } from "@/server/actions/student";
import { useEffect } from "react";

export default function Logout() {
    useEffect(() => {
        logoutStudent().catch(console.error);
    }, []);

    return null;
}

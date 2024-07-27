import { Session } from "@/types/session";
import { redis } from "./lib/connection";

export async function setSession(sid: string, session: Session): Promise<void> {
    const key = `session:${sid}`;

    const expireSecond = Math.floor((session.expiredAt - Date.now()) / 1000);

    await redis.setex(key, expireSecond, JSON.stringify(session));

    return;
}

export async function getSession(sid: string): Promise<Session | null> {
    const key = `session:${sid}`;
    const value = await redis.get(key);

    if (!value) {
        return null;
    }

    const session = JSON.parse(value) as Session;

    return session;
}

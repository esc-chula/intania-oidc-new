import { randomBytes } from "crypto";

export function randomString(length: number) {
    const byteCount = ((length + 1) * 3) / 4;
    return randomBytes(byteCount).toString("base64url").slice(0, length);
}

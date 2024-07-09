import { api } from "@/trpc/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
    async function login(formData: FormData) {
        "use server";
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if (!username || !password) {
            return;
        }

        const result = await api.student.login({ username, password });

        if (!result.success || !result.data) {
            return;
        }

        const { sid, expiredAt } = result.data;

        const cookieJar = cookies();
        cookieJar.set("sid", sid, {
            expires: expiredAt,
        });

        return {
            sid,
            expiredAt,
        };
    }

    const cookieStore = cookies();
    const sid = cookieStore.get("sid");
    if (sid) {
        redirect("/me");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <form action={login} className="flex flex-col gap-2">
                <input
                    className="p-2 text-black"
                    name="username"
                    placeholder="username"
                />
                <input
                    className="p-2 text-black"
                    name="password"
                    placeholder="password"
                />
                <button className="bg-pink-400 p-2 text-black" type="submit">
                    Login
                </button>
            </form>
        </main>
    );
}

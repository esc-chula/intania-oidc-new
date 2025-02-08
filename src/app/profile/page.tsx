import Header from "@/components/profile/header";
import { me } from "@/server/controller/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const sessionId = cookies().get("sid")?.value;
    if (!sessionId) return redirect("/logout");

    const meResponse = await me(sessionId);

    if (!meResponse.success) {
        const errors = meResponse.errors;
        throw new Error(errors.join(", "));
    }

    const meData = meResponse.data;

    if (!meData.student || !meData.account?.publicId) {
        throw new Error("Something went wrong");
    }

    return (
        <div className="flex size-full flex-col items-center">
            <div className="relative flex size-full min-h-dvh flex-col gap-8 p-6 sm:p-8 md:p-12">
                <Header studentData={meData.student} />
            </div>
        </div>
    );
}

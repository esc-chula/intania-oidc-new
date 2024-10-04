import { redirect } from "next/navigation";
import FormComponent from "@/components/register/3-form";
import { cookies } from "next/headers";
import { grpc } from "@/server/grpc";

export default async function Page() {
    const jar = cookies();
    const sessionId = jar.get("sid")?.value;
    if (!sessionId) return redirect("/logout");

    const me = await grpc.account.me({
        sessionId,
    }).catch(_ => {
        redirect("/logout")
    });

    if (!me.student) {
        throw new Error("Something went wrong")
    }

    return <FormComponent studentData={me.student} />;
}

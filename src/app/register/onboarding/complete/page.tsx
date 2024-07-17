import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { type Student } from "@/types/student";
import { TRPCError } from "@trpc/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
    const me = (await api.student.me().catch((e) => {
        if (e instanceof TRPCError && e.code == "UNAUTHORIZED") {
            redirect("/logout");
        }
    })) as Student;

    return (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-10 p-4 pt-20">
            <Image src="/success.svg" alt="success" width={200} height={200} />
            <h1 className="text-3xl font-bold">ลงทะเบียนสำเร็จ</h1>
            <p>ข้อมูลของการลงทะเบียนนิสิตใหม่ได้ถูกบันทึกแล้ว</p>
            <Link href="https://or67.intania.org">
                <Button>or67.intania.org</Button>
            </Link>
        </div>
    );
}

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-10 p-4 pt-20">
            <Image src="/success.svg" alt="success" width={200} height={200} />
            <h1 className="text-3xl font-bold">ลงทะเบียนสำเร็จ</h1>
            <p>ข้อมูลของการลงทะเบียนนิสิตใหม่ได้ถูกบันทึกแล้ว</p>
            <Link href="/profile">
                <Button>โปรไฟล์</Button>
            </Link>
        </div>
    );
}

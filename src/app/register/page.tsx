import ESCLogoWithoutText from "@/components/esc/ESCLogoWithoutText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/trpc/server";
import type { Student } from "@/types/student";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Year() {
    const me = (await api.student.me().catch((e) => {
        if (e instanceof TRPCError && e.code == "UNAUTHORIZED") {
            redirect("/logout");
        }
    })) as Student;

    if (!me.studentId) return null;

    return <span>ปีการศึกษา 25{me.studentId.slice(0, 2)}</span>;
}

export default async function Page() {
    const cookieStore = cookies();
    const sid = cookieStore.get("sid");

    return (
        <div className="flex size-full flex-col items-center">
            <div className="relative flex size-full min-h-dvh flex-col justify-between gap-16 rounded-2xl p-12">
                <div className="flex w-full flex-col items-center gap-10 text-center">
                    <ESCLogoWithoutText className="h-14 w-fit fill-primary md:h-16" />
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold md:text-3xl">
                            เข้าสู่ระบบ
                        </h2>
                        <h1 className="text-5xl font-bold text-primary md:text-6xl">
                            ลงทะเบียนนิสิตใหม่
                        </h1>
                        <p className="flex flex-wrap items-center justify-center gap-2 text-center font-medium md:text-xl">
                            แบบฟอร์มลงทะเบียนนิสิตใหม่
                            {sid && <Year />}
                        </p>
                    </div>
                </div>
                <div>
                    <Card>
                        <CardContent className="pt-6 text-center text-muted-foreground">
                            ข้อมูลที่กรอกนับจากนี้จะถูกนำไปใช้ตลอดการมีสถานะเป็นนิสิตคณะวิศวะฯจุฬาฯ
                            โปรดตรวจสอบและยืนยัน
                            ความถูกต้องหลังจากกรอกเสร็จและส่ง
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="size-full py-3 text-base md:text-xl"
                                size="lg"
                                asChild
                            >
                                <Link
                                    href={
                                        sid
                                            ? "/register/onboarding/step-one"
                                            : "/"
                                    }
                                >
                                    เริ่มต้น
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    {sid && (
                        <div className="pt-4 text-center text-sm text-neutral-500">
                            <Link href="/logout" className="hover:underline">
                                ลงทะเบียนด้วยบัญชีอื่น
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

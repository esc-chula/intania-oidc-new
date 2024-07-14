"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useUserForm } from "@/contexts/form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function Page() {
    const formContext = useUserForm();

    const formSchema = z.object({
        pdpa: z.boolean(),
        cuea: z.boolean(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    function onSubmit() {
        // TODO: Post user data to backend
        formContext.postUserData().catch(console.error);
        // router.push("TODO: Araideewa");
    }

    useEffect(() => {
        formContext.setStep(5);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- this effect should only run once
    }, []);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col divide-y divide-muted-foreground [&>div]:py-12 [&>section]:py-12"
            >
                <section className="flex flex-col gap-2 !pt-0">
                    <FormField
                        control={form.control}
                        name="pdpa"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    นโยบายการจัดการข้อมูลส่วนบุคคล
                                </FormLabel>
                                <FormLabel className="flex size-full cursor-pointer rounded-xl bg-background p-5">
                                    <div className="flex flex-col gap-4">
                                        <p className="space-y-4 font-normal text-muted-foreground">
                                            <p className="font-semibold">
                                                ขอบเขตนโยบาย
                                            </p>

                                            <p>
                                                นโยบายนี้ครอบคลุมถึงการเก็บรวบรวม
                                                ใช้ เปิดเผย
                                                และจัดเก็บข้อมูลส่วนบุคคลของนิสิตใหม่ที่เข้าศึกษาที่คณะวิศวกรรมศาสตร์
                                                จุฬาลงกรณ์มหาวิทยาลัย
                                                รวมถึงข้อมูลที่ได้จากการลงทะเบียน
                                                กิจกรรมภายในคณะ
                                                และการใช้บริการต่างๆ ของคณะฯ
                                            </p>

                                            <p className="font-semibold">
                                                การเก็บรวบรวมข้อมูล
                                            </p>

                                            <p>
                                                คณะวิศวกรรมศาสตร์
                                                จุฬาลงกรณ์มหาวิทยาลัย
                                                จะเก็บรวบรวมข้อมูลส่วนบุคคลของนิสิตใหม่เฉพาะข้อมูลที่จำเป็นต่อการเป็นอยู่ของนิสิต
                                                งานทะเบียน กิจกรรมภายในคณะ
                                                และการให้บริการต่างๆ
                                            </p>

                                            <p className="font-semibold">
                                                การใช้ข้อมูล
                                            </p>

                                            <p>
                                                ข้อมูลส่วนบุคคลของนิสิตใหม่จะถูกใช้เพื่อวัตถุประสงค์ดังต่อไปนี้:
                                            </p>

                                            <ul className="list-inside list-disc">
                                                <li>
                                                    การลงทะเบียนและการจัดการศึกษาของนิสิตใหม่
                                                </li>
                                                <li>
                                                    การประสานงานและการสื่อสารกับนิสิตใหม่
                                                </li>
                                                <li>
                                                    การให้บริการต่าง ๆ
                                                    ที่เกี่ยวข้องกับการศึกษา
                                                </li>
                                                <li>
                                                    การให้บริการต่าง ๆ
                                                    ที่เกี่ยวข้องกับกิจกรรม
                                                </li>
                                                <li>
                                                    การจัดทำเอกสารที่เกี่ยวข้อง
                                                </li>
                                            </ul>

                                            <p className="font-semibold">
                                                การเปิดเผยข้อมูล
                                            </p>

                                            <p>
                                                คณะวิศวกรรมศาสตร์
                                                จุฬาลงกรณ์มหาวิทยาลัย
                                                จะเปิดเผยข้อมูลเบื้องต้นให้แก่
                                                กรรมการนิสิตคณะวิศวกรรมศาสตร์
                                                จุฬาลงกรณ์มหาวิทยาลัย
                                                เพื่อเป็นประโยชน์ต่อการประสานงาน
                                                งานทะเบียน และกิจกรรมภายในคณะฯ
                                                และจะไม่เปิดเผยข้อมูลส่วนบุคคลของนิสิตใหม่แก่บุคคลภายนอกโดยไม่ได้รับความยินยอมจากนิสิตใหม่
                                                ยกเว้นในกรณีที่เป็นไปตามกฎหมายหรือมีคำสั่งศาล
                                            </p>

                                            <p className="font-semibold">
                                                สิทธิของนิสิตใหม่
                                            </p>

                                            <p>
                                                นิสิตใหม่มีสิทธิในการเข้าถึงข้อมูลส่วนบุคคลของตนเอง
                                                สามารถขอแก้ไข ลบ
                                                หรือระงับการใช้ข้อมูลส่วนบุคคลได้ตามข้อกำหนด
                                                ซึ่งสามารถร้องขอผ่านอีเมล
                                                tech@intania.org
                                            </p>

                                            <p className="font-semibold">
                                                การเปลี่ยนแปลงนโยบาย
                                            </p>

                                            <p>
                                                คณะวิศวกรรมศาสตร์
                                                จุฬาลงกรณ์มหาวิทยาลัย และ
                                                กรรมการนิสิตคณะวิศวกรรมศาสตร์
                                                จุฬาลงกรณ์มหาวิทยาลัย
                                                อาจทำการปรับปรุงหรือเปลี่ยนแปลงนโยบายนี้ได้ตามความเหมาะสม
                                                โดยจะแจ้งให้ทราบผ่านทางเว็บไซต์
                                                accounts.intania.org
                                            </p>
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            ยอมรับ
                                        </div>
                                    </div>
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <section className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="cuea"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    สมาคมนิสิตเก่าวิศวกรรมศาสตร์แห่งจุฬาลงกรณ์มหาวิทยาลัย
                                    (สวจ.)
                                </FormLabel>
                                <FormLabel className="flex cursor-pointer justify-center gap-2 rounded-xl bg-background p-5 text-muted-foreground">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    ข้าพเจ้ายินยอมให้เมื่อจบการศึกษา
                                    ข้อมูลของข้าพเจ้าจะนำส่งต่อและเป็นสมาชิกของสมาคมนิสิตเก่าวิศวกรรมศาสตร์แห่งจุฬาลงกรณ์มหาวิทยาลัย
                                    (สวจ.)
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <Button type="submit" className="self-end" size="lg">
                    ถัดไป
                </Button>
            </form>
        </Form>
    );
}

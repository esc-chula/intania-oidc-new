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
                                    นโยบายการจัดการข้อมูล (PDPA)
                                </FormLabel>
                                <FormLabel className="flex size-full cursor-pointer rounded-xl bg-background p-5">
                                    <div className="flex flex-col gap-4">
                                        <p className="text-muted-foreground">
                                            {/* TODO: Wording */}
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Culpa
                                            cum quos sapiente quia, incidunt,
                                            unde porro accusantium quo repellat
                                            temporibus impedit maiores aperiam
                                            libero nihil. Sed, minima iure.
                                            Voluptates, iure. Voluptate totam
                                            veritatis illum! Eaque nobis est
                                            sequi corrupti maiores tempore
                                            saepe, earum mollitia at delectus?
                                            Magnam dolore ipsum deserunt.
                                            Voluptatem iusto voluptas temporibus
                                            incidunt possimus. Pariatur tenetur
                                            commodi culpa!
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
                                    ยินยอมให้เมื่อจบการศึกษาข้อมูลของ
                                    ท่านจะเป็นสมาชิกของสมาคมนิสิตเก่า-วิศวกรรมศาสตร์แห่งจุฬาลงกรณ์-
                                    มหาวิทยาลัย (สวจ.)
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

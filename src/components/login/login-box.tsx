"use client";

import ESCLogoWithoutText from "@/components/esc/esc-logo-without-text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { loginStudent } from "@/server/actions/student";
import { useState } from "react";

export const formSchema = z.object({
    username: z.string().length(10),
    password: z.string().min(2),
});

export default function LoginBox() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const [error, setError] = useState<string | null>(null);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await loginStudent(values.username, values.password);
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    }

    return (
        <div className="relative flex size-full flex-col gap-16 rounded-2xl p-12 md:aspect-[614/764] md:bg-card md:shadow-md lg:aspect-[1024/460] lg:grid-cols-2 lg:flex-row lg:p-14">
            <div className="flex w-full flex-col justify-between text-center md:text-start">
                <div className="flex flex-col items-center gap-10 md:items-start">
                    <ESCLogoWithoutText className="h-14 w-fit fill-primary md:h-16" />
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-semibold md:text-3xl">
                            เข้าสู่ระบบ
                        </h2>
                        <h1 className="text-5xl font-bold text-primary md:text-6xl">
                            INTANIA
                        </h1>
                        <p className="font-medium text-muted-foreground md:text-xl">
                            ใช้รหัส CUNET เพื่อเข้าสู่ระบบ
                        </p>
                    </div>
                </div>
                <p className="text-red-500">{error && error}</p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex w-full flex-col items-center gap-5 lg:place-self-center"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col gap-2">
                                <FormLabel className="text-muted-foreground">
                                    รหัสนิสิต
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col gap-2">
                                <FormLabel className="text-muted-foreground">
                                    รหัสผ่าน
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=""
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="self-end text-base md:absolute md:bottom-12 md:right-12 md:text-xl lg:bottom-14 lg:right-14"
                        size="lg"
                        type="submit"
                    >
                        ถัดไป
                    </Button>
                </form>
            </Form>
        </div>
    );
}

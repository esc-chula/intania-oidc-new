"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserForm } from "@/contexts/form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Page() {
    const formContext = useUserForm();
    const router = useRouter();

    const formSchema = z.object({
        nationalId: z.string().max(15).optional(),
        lineId: z.string().max(30).optional(),
        facebook: z.string().max(60).optional(),
        email: z.string().max(60).optional(),
        phoneNumber: z.string().max(16).optional(),
        nationalityId: z.number().optional(),
        religionId: z.number().optional(),
        currentAddressNumber: z.string().max(60).optional(),
        currentAddressProvinceId: z.number().optional(),
        currentAddressDistrictId: z.number().optional(),
        currentAddressOther: z.string().max(400).optional(),
        currentAddressLatitude: z.string().max(16).optional(),
        currentAddressLongitude: z.string().max(16).optional(),
        hometownAddressNumber: z.string().max(60).optional(),
        hometownAddressProvinceId: z.number().optional(),
        hometownAddressDistrictId: z.number().optional(),
        hometownAddressOther: z.string().max(400).optional(),
        hometownAddressLatitude: z.string().max(16).optional(),
        hometownAddressLongitude: z.string().max(16).optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        formContext.updateUserData(values);
        router.push("/register/onboarding/step-three");
    }

    useEffect(() => {
        formContext.setStep(2);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- this effect should only run once
    }, []);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col divide-y divide-muted-foreground [&>div]:py-12 [&>section]:py-12"
            >
                <section className="flex flex-col gap-2 !pt-0">
                    {/* TODO: Select */}
                    <FormField
                        control={form.control}
                        name="nationalityId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>เชื้อชาติ</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกเชื้อชาติ"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* TODO: What name is this */}
                    <FormField
                        control={form.control}
                        name=""
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>รหัสบัตรประชาชน</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกรหัสบัตรประชาชน"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* TODO: Select? */}
                    <FormField
                        control={form.control}
                        name="religionId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ศาสนา</FormLabel>
                                <FormControl>
                                    <Input placeholder="กรอกศาสนา" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <section className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>อีเมลส่วนตัว</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกอีเมลส่วนตัว"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>เบอร์โทรศัพท์ส่วนตัว</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกเบอร์โทรศัพท์ส่วนตัว"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Facebook</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกชื่อโปรไฟล์ Facebook"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lineId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LINE ID</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอก LINE ID"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                {/* TODO: MAP */}
                <Button type="submit" className="self-end" size="lg">
                    ถัดไป
                </Button>
            </form>
        </Form>
    );
}

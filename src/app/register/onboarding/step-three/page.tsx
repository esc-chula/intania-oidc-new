"use client";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
        foodLimitations: z.string().max(100).optional(), // comma-sepearated string
        drugAllergies: z.string().max(100).optional(), // comma-sepearated string
        medicalConditions: z.string().max(100).optional(), // comma-sepearated string
        medications: z.string().max(100).optional(), // comma-sepearated string
        bloodType: z.enum(["A", "B", "AB", "O"]).optional(),
        shirtSize: z.string().max(15).optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        formContext.updateUserData(values);
        router.push("/register/onboarding/step-four");
    }

    useEffect(() => {
        formContext.setStep(3);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- this effect should only run once
    }, []);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col divide-y divide-muted-foreground [&>div]:py-12 [&>section]:py-12"
            >
                <FormField
                    control={form.control}
                    name="shirtSize"
                    render={({ field }) => (
                        <FormItem className="!pt-0">
                            <FormLabel>ไซส์เสื้อ</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="เลือกไซส์เสื้อ" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="s">S</SelectItem>
                                    <SelectItem value="m">M</SelectItem>
                                    <SelectItem value="l">L</SelectItem>
                                    <SelectItem value="xl">XL</SelectItem>
                                    <SelectItem value="xxl">XXL</SelectItem>
                                    <SelectItem value="3xl">3XL</SelectItem>
                                    <SelectItem value="4xl">4XL</SelectItem>
                                    <SelectItem value="5xl">5XL</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <section className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="bloodType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>กลุ่มเลือด</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกกลุ่มเลือด" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="A">A</SelectItem>
                                        <SelectItem value="B">B</SelectItem>
                                        <SelectItem value="O">O</SelectItem>
                                        <SelectItem value="AB">AB</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="foodLimitations"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>อาหารที่แพ้</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกอาหารที่แพ้"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    หากมีหลายรายการ กรุณาคั่นด้วยเครื่องหมาย ,
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="drugAllergies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ยาที่แพ้</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกยาที่แพ้"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    หากมีหลายรายการ กรุณาคั่นด้วยเครื่องหมาย ,
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="medicalConditions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>โรคประจำตัว</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกโรคประจำตัว"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    หากมีหลายรายการ กรุณาคั่นด้วยเครื่องหมาย ,
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="medications"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ยาประจำตัว</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกยาประจำตัว"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    หากมีหลายรายการ กรุณาคั่นด้วยเครื่องหมาย ,
                                </FormDescription>
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

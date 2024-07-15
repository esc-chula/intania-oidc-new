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
import type { Student } from "@/types/student";
import { updateStudent } from "@/server/action/student";

const formSchema = z.object({
    foodLimitations: z.string().max(200).optional(), // comma-sepearated string
    drugAllergies: z.string().max(200).optional(), // comma-sepearated string
    medicalConditions: z.string().max(200).optional(), // comma-sepearated string
    medications: z.string().max(200).optional(), // comma-sepearated string
    bloodType: z.enum(["A", "B", "AB", "O"]),
    shirtSize: z.number(),
});

type Props = {
    studentData: Student;
};

const FormComponent = ({ studentData }: Props) => {
    const formContext = useUserForm();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await updateStudent({
            id: studentData.id,
            foodLimitations: values.foodLimitations,
            drugAllergies: values.drugAllergies,
            medicalConditions: values.medicalConditions,
            medications: values.medications,
            bloodType: values.bloodType,
            shirtSize: values.shirtSize,
        });

        formContext.updateUserData(values);
        router.push("/register/onboarding/step-four");
    }

    useEffect(() => {
        formContext.setStep(3);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- this effect should only run once
    }, []);

    useEffect(() => {
        for (const key in studentData) {
            if (key in form.getValues()) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                //@ts-expect-error -- just make it works
                if (studentData[key] !== null) {
                    // @ts-expect-error -- just make it works
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                    form.setValue(key, studentData[key]);
                }
            }
        }
    }, [form, studentData]);

    const shirtSizes = [
        { label: 'S (36")', value: 36 },
        { label: 'M (38")', value: 38 },
        { label: 'L (40")', value: 40 },
        { label: 'XL (42")', value: 42 },
        { label: 'XXL (44")', value: 44 },
        { label: 'XXXL (46")', value: 46 },
    ];

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col divide-y divide-muted-foreground [&>div]:py-12 [&>section]:py-12"
            >
                <FormField
                    control={form.control}
                    name="shirtSize"
                    render={({ field }) => {
                        console.log(field);
                        return (
                            <FormItem className="!pt-0">
                                <FormLabel>ไซส์เสื้อ</FormLabel>
                                <Select
                                    value={
                                        field.value
                                            ? field.value.toString()
                                            : ""
                                    }
                                    onValueChange={(value) => {
                                        if (!value) return;
                                        console.log(value);
                                        field.onChange(parseInt(value));
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกไซส์เสื้อ" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {shirtSizes.map((size) => (
                                            <SelectItem
                                                key={size.value}
                                                value={size.value.toString()}
                                            >
                                                {size.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <section className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="bloodType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>กลุ่มเลือด</FormLabel>
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        if (!value) return;
                                        field.onChange(value);
                                    }}
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
};

export default FormComponent;

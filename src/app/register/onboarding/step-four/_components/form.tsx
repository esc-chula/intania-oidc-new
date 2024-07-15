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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import type { Student } from "@/types/student";
import { type FamilyMemberStatuses, type FamilyStatuses } from "../_types/form";
import { updateStudent } from "@/server/action/student";

const formSchema = z.object({
    fatherName: z.string().max(150), // full name in english
    fatherBirthYear: z.number(),
    fatherStatusId: z.number().optional(),

    motherName: z.string().max(150), // full name in english
    motherBirthYear: z.number(),
    motherStatusId: z.number().optional(),

    familyStatusId: z.number(),

    parent: z.enum(["Father", "Mother", "Other"]),
    parentPhoneNumber: z.string().regex(/^\d{3}-\d{3}-\d{4}$/),
    parentAddress: z.string().max(400).optional(),

    siblingTotal: z.string(),
    siblingOrder: z.string(),
});

type Props = {
    studentData: Student;
    familyStatuses: FamilyStatuses[];
    familyMemberStatuses: FamilyMemberStatuses[];
};

const FormCompoent = ({
    studentData,
    familyStatuses,
    familyMemberStatuses,
}: Props) => {
    const formContext = useUserForm();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const updatedValue = {
            fatherName: values.fatherName,
            fatherBirthYear: values.fatherBirthYear,
            motherName: values.motherName,
            motherBirthYear: values.motherBirthYear,
            familyStatusId: values.familyStatusId,
            siblingTotal: parseInt(values.siblingTotal),
            siblingOrder: parseInt(values.siblingOrder),
            parent: values.parent,
            parentPhoneNumber: values.parentPhoneNumber,
        };

        await updateStudent({
            id: studentData.id,
            ...updatedValue,
        });

        formContext.updateUserData(updatedValue);
        router.push("/register/onboarding/step-five");
    }

    useEffect(() => {
        formContext.setStep(4);
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
                    if (key === "siblingTotal") {
                        // @ts-expect-error -- just make it works
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                        form.setValue(key, studentData[key].toString());
                    }
                    if (key === "siblingOrder") {
                        // @ts-expect-error -- just make it works
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                        form.setValue(key, studentData[key].toString());
                    }
                }
            }
        }
    }, [form, studentData]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col divide-y divide-muted-foreground [&>div]:py-12 [&>section]:py-12"
            >
                <section className="flex flex-col gap-2 !pt-0">
                    <FormField
                        control={form.control}
                        name="fatherName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ชื่อจริง-นามสกุล บิดา</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกชื่อจริง-นามสกุล บิดา"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fatherBirthYear"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>ปีเกิดบิดา</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "justify-between",
                                                    !field.value &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                {field.value
                                                    ? field.value
                                                    : "เลือกปีเกิดบิดา"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="เลือกปีเกิดบิดา" />
                                            <CommandEmpty>
                                                กรุณาติดต่อทีมงาน
                                            </CommandEmpty>
                                            <CommandGroup>
                                                <CommandList>
                                                    {Array.from(
                                                        { length: 100 },
                                                        (_, i) =>
                                                            new Date().getFullYear() -
                                                            99 +
                                                            i,
                                                    ).map((year) => (
                                                        <CommandItem
                                                            value={year.toString()}
                                                            key={year}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "fatherBirthYear",
                                                                    year,
                                                                );
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    year ===
                                                                        field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0",
                                                                )}
                                                            />
                                                            {year}
                                                        </CommandItem>
                                                    ))}
                                                </CommandList>
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    ปีคริสต์ศักราช
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <section className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="motherName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ชื่อจริง-นามสกุล มารดา</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกชื่อจริง-นามสกุล มารดา"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="motherBirthYear"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>ปีเกิดมารดา</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "justify-between",
                                                    !field.value &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                {field.value
                                                    ? field.value
                                                    : "เลือกปีเกิดมารดา"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="เลือกปีเกิดมารดา" />
                                            <CommandEmpty>
                                                กรุณาติดต่อทีมงาน
                                            </CommandEmpty>
                                            <CommandGroup>
                                                <CommandList>
                                                    {Array.from(
                                                        { length: 100 },
                                                        (_, i) =>
                                                            new Date().getFullYear() -
                                                            99 +
                                                            i,
                                                    ).map((year) => (
                                                        <CommandItem
                                                            value={year.toString()}
                                                            key={year}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "motherBirthYear",
                                                                    year,
                                                                );
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    year ===
                                                                        field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0",
                                                                )}
                                                            />
                                                            {year}
                                                        </CommandItem>
                                                    ))}
                                                </CommandList>
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    ปีคริสต์ศักราช
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <section className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="familyStatusId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>สถานะครอบครัว</FormLabel>
                                <Select
                                    value={
                                        field.value
                                            ? field.value.toString()
                                            : undefined
                                    }
                                    onValueChange={(value) => {
                                        if (!value) {
                                            return;
                                        }
                                        field.onChange(parseInt(value));
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกสถานะครอบครัว" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {familyStatuses.map((status) => (
                                            <SelectItem
                                                value={status.id.toString()}
                                                key={status.id}
                                            >
                                                {status.valueTh}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="siblingTotal"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>จำนวนพี่น้อง</FormLabel>
                                    <FormControl>
                                        <Input
                                            // expect number got string
                                            placeholder="กรอกจำนวนพี่น้อง"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        กรอกตัวเลขจำนวนพี่น้องทั้งหมด
                                        (หากมีเพียงคนเดียวให้กรอก 1)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="siblingOrder"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ลำดับพี่น้อง</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกลำดับพี่น้อง"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    ลำดับพี่น้องของตัวเอง (1 = เกิดคนแรก)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <section className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="parent"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ผู้ปกครอง</FormLabel>
                                <Select
                                    value={
                                        field.value ? field.value : undefined
                                    }
                                    onValueChange={(value) => {
                                        if (!value) {
                                            return;
                                        }
                                        field.onChange(value);
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกผู้ปกครอง" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Father">
                                            บิดา
                                        </SelectItem>
                                        <SelectItem value="Mother">
                                            มารดา
                                        </SelectItem>
                                        <SelectItem value="Other">
                                            อื่น ๆ
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    หรือผู้ที่สามารถติดต่อฉุกเฉินได้
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="parentPhoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>เบอร์โทรศัพท์ผู้ปกครอง</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกเบอร์โทรศัพท์ผู้ปกครอง"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    กรอกในรูปแบบ 0XX-XXX-XXXX
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

export default FormCompoent;

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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function Page() {
    const formContext = useUserForm();
    const router = useRouter();
    const [selectedBirthDate, setSelectedBirthDate] = useState<
        Date | undefined
    >();

    const formSchema = z.object({
        studentId: z.string().max(32).optional(),
        title: z.string().max(16).optional(),
        firstNameTh: z.string().max(30).optional(),
        familyNameTh: z.string().max(60).optional(),
        nicknameTh: z.string().max(30).optional(),
        firstNameEn: z.string().max(30).optional(),
        familyNameEn: z.string().max(60).optional(),
        nicknameEn: z.string().max(30).optional(),
        preferredPronoun: z.string().max(30).optional(),
        birthDate: z.coerce.string().datetime().optional(),
        departmentId: z.number().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        formContext.updateUserData(values);
        router.push("/register/onboarding/step-two");
    }

    useEffect(() => {
        formContext.setStep(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- this effect should only run once
    }, []);

    useEffect(() => {
        form.setValue(
            "birthDate",
            selectedBirthDate
                ? format(selectedBirthDate, "yyyy-MM-dd'T'hh:mm:ss'Z'")
                : undefined,
        );
    }, [form, selectedBirthDate]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col divide-y divide-muted-foreground [&>div]:py-12 [&>section]:py-12"
            >
                <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                        <FormItem className="!pt-0">
                            <FormLabel>รหัสนิสิต</FormLabel>
                            <FormControl>
                                <Input placeholder="6x3xxxxx21" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>คำนำหน้าชื่อ</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="เลือกคำนำหน้าชื่อ" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="นาย">นาย</SelectItem>
                                    <SelectItem value="นาง">นาง</SelectItem>
                                    <SelectItem value="นางสาว">
                                        นางสาว
                                    </SelectItem>
                                    <SelectItem value="เด็กชาย">
                                        เด็กชาย
                                    </SelectItem>
                                    <SelectItem value="เด็กหญิง">
                                        เด็กหญิง
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                ตามบัตรประจำตัวประชาชน
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <section className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="firstNameTh"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ชื่อ (TH)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกชื่อภาษาไทย"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="familyNameTh"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>นามสกุล (TH)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกนามสกุลภาษาไทย"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nicknameTh"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ชื่อเล่น (TH)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกชื่อเล่นภาษาไทย"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <section className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="firstNameEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ชื่อ (EN)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกชื่อภาษาอังกฤษ"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="familyNameEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>นามสกุล (EN)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกนามสกุลภาษาอังกฤษ"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nicknameEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ชื่อเล่น (EN)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกชื่อเล่นภาษาอังกฤษ"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <section className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="preferredPronoun"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>สรรพนามที่ประสงค์ใช้</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกสรรพนาม" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="he/him/his">
                                            he/him/his
                                        </SelectItem>
                                        <SelectItem value="she/her/hers">
                                            she/her/hers
                                        </SelectItem>
                                        <SelectItem value="they/them/their">
                                            they/them/their
                                        </SelectItem>
                                        {/* TODO: Input */}
                                        <SelectItem value="other">
                                            อื่น ๆ
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>วันเกิด</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            className={cn(
                                                "text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground",
                                            )}
                                            variant="outline"
                                        >
                                            {field.value ? (
                                                format(
                                                    field.value,
                                                    "dd/MM/yyyy",
                                                )
                                            ) : (
                                                <span>เลือกวันเกิด</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="start"
                                    className="w-auto p-2"
                                >
                                    <CalendarComponent
                                        initialFocus
                                        mode="single"
                                        selected={selectedBirthDate}
                                        onDayClick={setSelectedBirthDate}
                                        translate="th"
                                        locale={th}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>ปีคริสต์ศักราช</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="self-end" size="lg">
                    ถัดไป
                </Button>
            </form>
        </Form>
    );
}

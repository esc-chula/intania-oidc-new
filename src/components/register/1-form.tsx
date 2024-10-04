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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn, titleThToEn } from "@/lib/utils";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { useEffect, useState } from "react";
import { updateStudent } from "@/server/actions/student";
import { useStudentForm } from "@/contexts/form-context";
import { Department, Student } from "@/generated/intania/auth/student/v1/student";
import { z } from "zod";
import { BindingMapping, directMap } from "@/types/helper";

const formSchema = z.object({
    studentId: z.string().max(32),
    titleTh: z.string().max(30),
    firstNameTh: z.string().min(1).max(90),
    // TODO
    middleNameTh: z.string().max(90).optional(),
    familyNameTh: z.string().min(1).max(90),
    nicknameTh: z.string().max(50),
    firstNameEn: z.string().min(1).max(90),
    // TODO
    middleNameEn: z.string().max(90).optional(),
    familyNameEn: z.string().min(1).max(90),
    nicknameEn: z.string().min(1).max(50),
    preferredPronoun: z.string().max(50),
    birthDate: z.date(),
    departmentId: z.number(),
});

type FormSchema = z.infer<typeof formSchema>

interface Props {
    studentData: Student;
    departments: Department[];
}

export default function FormComponent({ studentData, departments }: Props) {
    // STEP
    const { setStep } = useStudentForm();
    useEffect(() => {
        setStep(1);
    }, [setStep]);

    // FORM
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    // HANDLERS
    const [selectedBirthDate, setSelectedBirthDate] = useState<
        Date | undefined
    >();
    useEffect(() => {
        if (selectedBirthDate) {
            form.setValue("birthDate", selectedBirthDate);
        }
    }, [form, selectedBirthDate]);

    const bindingMap: BindingMapping<Student, FormSchema> = {
        titleTh: {
            formBinding: {}
        },
        firstNameTh: {
            formBinding: {}
        },
        familyNameTh: {
            formBinding: {}
        },
        nicknameTh: {
            formBinding: {}
        },
        firstNameEn: {
            formBinding: {}
        },
        familyNameEn: {
            formBinding: {}
        },
        nicknameEn: {
            formBinding: {}
        },
        preferredPronoun: {
            formBinding: {}
        },
        birthDate: {
            formBinding: {},
            stateBinding: setSelectedBirthDate,
        },
        department: {
            formBinding: {
                formKey: "departmentId",
            },
            objectKey: ["id"]
        },
        studentId: {
            formBinding: {},
        },
    }

    useEffect(() => {
        const keys = Object.keys(studentData) as (keyof Student)[]
        keys.forEach((key) => {
            var value = studentData[key];

            if (value === null || value === undefined) {
                return
            }

            const binding = bindingMap[key];
            if (!binding) {
                return;
            }

            if (typeof value === "object" && !Array.isArray(value)) {
                const ok = binding.objectKey || [];
                value = ok.reduce((acc, cur) => acc[cur as never], value);
            }

            if (binding.stateBinding) {
                binding.stateBinding(value);
            }
            if (binding.formBinding) {
                const k = binding.formBinding.formKey || (key as keyof FormSchema);
                form.setValue(k, value as never);
            }
        });
    }, [form, studentData]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    async function onSubmit(values: FormSchema) {
        setLoading(true);
        await updateStudent({
            id: studentData.id,
            titleEn: titleThToEn(values.titleTh),
            department: {
                id: values.departmentId,
            },
            ...values,
        });
        router.push("/register/onboarding/step-two");
    }

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
                                <Input
                                    placeholder="6x3xxxxx21"
                                    {...field}
                                    disabled
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="titleTh"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>คำนำหน้าชื่อ</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    if (!value) {
                                        return;
                                    }
                                    form.setValue("titleTh", value);
                                }}
                                value={field.value}
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
                        name="middleNameTh"
                        render={({ field }) => (
                            <FormItem className={cn(!field.value && "hidden")}>
                                <FormLabel>ชื่อกลาง (TH)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกชื่อกลางภาษาไทย"
                                        type={field.value ? "text" : "hidden"}
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
                        name="middleNameEn"
                        render={({ field }) => (
                            <FormItem className={cn(!field.value && "hidden")}>
                                <FormLabel>ชื่อกลาง (EN)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกชื่อกลางภาษาอังกฤษ"
                                        type={field.value ? "text" : "hidden"}
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
                                    value={field.value}
                                    onValueChange={(value) => {
                                        if (!value) {
                                            return;
                                        }
                                        form.setValue(
                                            "preferredPronoun",
                                            value,
                                        );
                                    }}
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
                <section className="flex flex-col gap-2">
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
                                <FormDescription>
                                    ปีคริสต์ศักราช
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <FormField
                    control={form.control}
                    name="departmentId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>ภาควิชา</FormLabel>
                                <Select
                                    value={
                                        departments.find(
                                            (department) =>
                                                department.id === field.value,
                                        )?.nameTh
                                    }
                                    onValueChange={(value) => {
                                        const selectedDepartment =
                                            departments.find(
                                                (department) =>
                                                    department.nameTh === value,
                                            );
                                        if (!selectedDepartment) return;
                                        field.onChange(selectedDepartment.id);
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกภาควิชา" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {departments.map((department) => (
                                            <SelectItem
                                                key={department.id}
                                                value={department.nameTh || ""}
                                            >
                                                {department.nameTh}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <Button
                    type="submit"
                    className="self-end"
                    size="lg"
                    disabled={loading}
                >
                    ถัดไป
                </Button>
            </form>
        </Form>
    );
}

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

export default function Page() {
    const formContext = useUserForm();
    const router = useRouter();

    const formSchema = z.object({
        fatherName: z.string().max(150).optional(), // full name in english
        fatherBirthYear: z.number().optional(),
        fatherStatusId: z.number().optional(),

        motherName: z.string().max(150).optional(), // full name in english
        motherBirthYear: z.number().optional(),
        motherStatusId: z.number().optional(),

        familyStatusId: z.number().optional(),

        parent: z.enum(["Father", "Mother", "Other"]).optional(),
        parentPhoneNumber: z.string().max(16).optional(),
        parentAddress: z.string().max(400).optional(),

        siblingTotal: z.number().optional(),
        siblingOrder: z.number().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        formContext.updateUserData(values);
        router.push("/register/onboarding/step-five");
    }

    useEffect(() => {
        formContext.setStep(4);
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
                    <FormField
                        control={form.control}
                        name="fatherStatusId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ความเป็นอยู่บิดา</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกความเป็นอยู่บิดา" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* TODO: Fix Wording and value */}
                                        <SelectItem value="1">
                                            มีชีวิต
                                        </SelectItem>
                                        <SelectItem value="2">
                                            เสียชีวิต
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
                    <FormField
                        control={form.control}
                        name="motherStatusId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ความเป็นอยู่มารดา</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกความเป็นอยู่มารดา" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* TODO: Fix Wording and value */}
                                        <SelectItem value="1">
                                            มีชีวิต
                                        </SelectItem>
                                        <SelectItem value="2">
                                            เสียชีวิต
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
                        name="familyStatusId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>สถานะครอบครัว</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกสถานะครอบครัว" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* TODO: Fix value */}
                                        <SelectItem value="1">
                                            อยู่ร่วมกัน
                                        </SelectItem>
                                        <SelectItem value="2">
                                            หย่าร้าง
                                        </SelectItem>
                                        <SelectItem value="3">
                                            แยกกันอยู่
                                        </SelectItem>
                                        {/* TODO: Others */}
                                        <SelectItem value="4">
                                            อื่น ๆ
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="siblingTotal"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>จำนวนพี่น้อง</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกจำนวนพี่น้อง"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
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
                                    ลำดับพี่น้องของตัวเอง 1 = เกิดคนแรก
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
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกผู้ปกครอง" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* TODO: Fix value */}
                                        <SelectItem value="1">บิดา</SelectItem>
                                        <SelectItem value="2">มารดา</SelectItem>
                                        {/* TODO: Others */}
                                        <SelectItem value="3">
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="parentAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ที่อยู่ผู้ปกครอง</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกที่อยู่ผู้ปกครอง" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* TODO: Fix value */}
                                        <SelectItem value="1">
                                            ที่อยู่ปัจจุบัน
                                        </SelectItem>
                                        <SelectItem value="2">
                                            ที่อยู่ภูมิลำเนา
                                        </SelectItem>
                                        {/* TODO: Others */}
                                        <SelectItem value="3">
                                            อื่น ๆ
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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

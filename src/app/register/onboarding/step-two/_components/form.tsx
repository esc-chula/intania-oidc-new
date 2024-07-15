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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useUserForm } from "@/contexts/form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import GoogleMap from "@/components/maps/maps";
import type { Country, District, Province, Religion } from "../types/form";

type Props = {
    countries: Country[];
    provinces: Province[];
    districts: District[];
    religions: Religion[];
};

const FormComponent = ({
    countries,
    provinces,
    districts,
    religions,
}: Props) => {
    const formContext = useUserForm();
    const router = useRouter();

    const formSchema = z.object({
        nationalId: z.string().length(13),
        lineId: z.string().max(30).optional(),
        facebook: z.string().max(60).optional(),
        email: z.string().max(60),
        phoneNumber: z.string().max(16),
        nationalityId: z.number(),
        religionId: z.number(),
        currentAddressNumber: z.string().max(60).optional(),
        currentAddressProvinceId: z.number(),
        currentAddressDistrictId: z.number(),
        currentAddressOther: z.string().max(400),
        currentAddressLatitude: z.string().max(16),
        currentAddressLongitude: z.string().max(16),
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

    const handleLocationSelect = (lat: number, lng: number) => {
        form.setValue("currentAddressLatitude", lat.toString());
        form.setValue("currentAddressLongitude", lng.toString());
        console.log(`Selected location: Latitude: ${lat}, Longitude: ${lng}`);
    };

    const [selectedCountry, setSelectedCountry] = useState(0);
    const [selectedProvince, setSelectedProvince] = useState(0);
    const [selectedHomeProvince, setSelectedHomeProvince] = useState(0);

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
                    <FormField
                        control={form.control}
                        name="nationalityId"
                        render={({ field }) => (
                            <FormItem className="!pt-0">
                                <FormLabel>เชื้อชาติ</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        const selectedCountry = countries.find(
                                            (country) => country.name === value,
                                        );

                                        if (!selectedCountry) {
                                            return;
                                        }

                                        field.onChange(selectedCountry.id);
                                        setSelectedCountry(selectedCountry.id);
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกเชื้อชาติ" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* Map through nationalities data */}
                                        {/* thailand first */}
                                        <SelectItem
                                            value={
                                                countries.find(
                                                    (country) =>
                                                        country.name ===
                                                        "Thailand",
                                                )?.name ?? "Thailand"
                                            }
                                        >
                                            {
                                                countries.find(
                                                    (country) =>
                                                        country.name ===
                                                        "Thailand",
                                                )?.name
                                            }
                                        </SelectItem>

                                        {countries
                                            .filter(
                                                (nationality) =>
                                                    nationality.name !==
                                                    "Thailand",
                                            )
                                            .map((nationality, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={nationality.name}
                                                >
                                                    {nationality.name}
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
                        name="nationalId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>รหัสบัตรประชาชน</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกรหัสบัตรประชาชน"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    กรอกเฉพาะตัวเลข 13 หลักติดกัน
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="religionId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ศาสนา</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        const selectedReligion = religions.find(
                                            (religion) =>
                                                religion.id === parseInt(value),
                                        );
                                        field.onChange(selectedReligion?.id);
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกศาสนา" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* Map through relegions data */}
                                        {religions.map((religion) => (
                                            <SelectItem
                                                key={religion.id}
                                                value={religion.nameTh}
                                            >
                                                {religion.nameTh}
                                            </SelectItem>
                                        ))}
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

                <section className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="currentAddressLatitude"
                        render={({ field }) => (
                            <Input type="hidden" {...field} />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currentAddressLongitude"
                        render={({ field }) => (
                            <Input type="hidden" {...field} />
                        )}
                    />
                    <div className="h-60 overflow-hidden rounded-lg border-[6px] border-white">
                        <GoogleMap
                            onLocationSelect={handleLocationSelect}
                            width="100%"
                            height="100%"
                            placeholder="ระบุตำแหน่งที่อยู่ปัจจุบัน"
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="currentAddressProvinceId"
                        render={({ field }) => (
                            <FormItem className="!pt-0">
                                <FormLabel>จังหวัดที่อยู่ปัจจุบัน</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        const selectedProvinceString =
                                            provinces.find(
                                                (province) =>
                                                    province.nameTh === value,
                                            );

                                        if (!selectedProvinceString) {
                                            return;
                                        }

                                        field.onChange(
                                            selectedProvinceString.provinceCode,
                                        );
                                        setSelectedProvince(
                                            selectedProvinceString.provinceCode,
                                        );
                                        // Additional logic to update districts based on selected province
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกจังหวัดที่อยู่ปัจจุบัน" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* Map through provinces data */}
                                        {provinces.map((province) => (
                                            <SelectItem
                                                key={province.provinceCode}
                                                value={province.nameTh}
                                            >
                                                {province.nameTh}
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
                        name="currentAddressDistrictId"
                        render={({ field }) => (
                            <FormItem className="!pt-0">
                                <FormLabel>เขตที่อยู่ปัจจุบัน</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        const selectedDistrict = districts.find(
                                            (district) =>
                                                district.nameTh === value,
                                        );
                                        field.onChange(
                                            selectedDistrict?.districtCode,
                                        );
                                        // Additional logic to update districts based on selected province
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกเขตที่อยู่ปัจจุบัน" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {districts
                                            .filter((district) => {
                                                console.log(
                                                    "Filtering Districts for Province Code:",
                                                    selectedProvince,
                                                ); // Debugging
                                                return (
                                                    district.provinceCode ===
                                                    selectedProvince
                                                );
                                            })
                                            .map((district) => (
                                                <SelectItem
                                                    key={district.districtCode}
                                                    value={district.nameTh}
                                                >
                                                    {district.nameTh}
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
                        name="currentAddressOther"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ที่อยู่ปัจจุบัน</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="กรอกที่อยู่ปัจจุบัน"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                {selectedCountry !== 215 && ( // Thailand
                    <section className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="hometownAddressLatitude"
                            render={({ field }) => (
                                <Input type="hidden" {...field} />
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hometownAddressLongitude"
                            render={({ field }) => (
                                <Input type="hidden" {...field} />
                            )}
                        />
                        <div className="h-60 overflow-hidden rounded-lg border-[6px] border-white">
                            <GoogleMap
                                onLocationSelect={handleLocationSelect}
                                width="100%"
                                height="100%"
                                placeholder="ระบุตำแหน่งที่อยู่ภูมิลำเนา"
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="hometownAddressProvinceId"
                            render={({ field }) => (
                                <FormItem className="!pt-0">
                                    <FormLabel>
                                        จังหวัดที่อยู่ภูมิลำเนา
                                    </FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            const selectedProvinceString =
                                                provinces.find(
                                                    (province) =>
                                                        province.nameTh ===
                                                        value,
                                                );

                                            if (!selectedProvinceString) {
                                                return;
                                            }

                                            field.onChange(
                                                selectedProvinceString?.provinceCode,
                                            );
                                            setSelectedHomeProvince(
                                                selectedProvinceString?.provinceCode,
                                            );
                                            // Additional logic to update districts based on selected province
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="เลือกจังหวัดที่อยู่ภูมิลำเนา" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* Map through provinces data */}
                                            {provinces.map((province) => (
                                                <SelectItem
                                                    key={province.provinceCode}
                                                    value={province.nameTh}
                                                >
                                                    {province.nameTh}
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
                            name="hometownAddressDistrictId"
                            render={({ field }) => (
                                <FormItem className="!pt-0">
                                    <FormLabel>เขตที่อยู่ภูมิลำเนา</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            const selectedDistrict =
                                                districts.find(
                                                    (district) =>
                                                        district.nameTh ===
                                                        value,
                                                );
                                            field.onChange(
                                                selectedDistrict?.districtCode,
                                            );
                                            // Additional logic to update districts based on selected province
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="เลือกเขตที่อยู่ภูมิลำเนา" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {districts
                                                .filter((district) => {
                                                    console.log(
                                                        "Filtering Districts for Province Code:",
                                                        selectedHomeProvince,
                                                    ); // Debugging
                                                    return (
                                                        district.provinceCode ===
                                                        selectedHomeProvince
                                                    );
                                                })
                                                .map((district) => (
                                                    <SelectItem
                                                        key={
                                                            district.districtCode
                                                        }
                                                        value={district.nameTh}
                                                    >
                                                        {district.nameTh}
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
                            name="hometownAddressOther"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ที่อยู่ภูมิลำเนา</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="กรอกที่อยู่ภูมิลำเนา"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>
                )}

                <Button type="submit" className="self-end" size="lg">
                    ถัดไป
                </Button>
            </form>
        </Form>
    );
};

export default FormComponent;

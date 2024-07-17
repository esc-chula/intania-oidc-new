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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import GoogleMap from "@/components/maps/maps";
import type { Country, District, Province, Religion } from "@/types/misc";
import { type Student } from "@/types/student";
import { updateStudent } from "@/server/actions/student";
import { useStudentForm } from "@/contexts/form-context";

const formSchema = z.object({
    nationalId: z.string().length(13),
    lineId: z.string().max(30).optional(),
    facebook: z.string().max(60).optional(),
    email: z.string().email().max(60),
    phoneNumber: z
        .string()
        .regex(/^\d{3}-\d{3}-\d{4}$/)
        .max(16),
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

type Props = {
    studentData: Student;
    countries: Country[];
    provinces: Province[];
    districts: District[];
    religions: Religion[];
};

export default function FormComponent({
    studentData,
    countries,
    provinces,
    districts,
    religions,
}: Props) {
    // STEP
    const { setStep } = useStudentForm();
    useEffect(() => {
        setStep(2);
    }, [setStep]);

    // MAP
    const [selectedCurrentLocationLat, setSelectedCurrentLocationLat] =
        useState<string | null>(null);
    const [selectedCurrentLocationLng, setSelectedCurrentLocationLng] =
        useState<string | null>(null);
    const [selectedHomeLocationLat, setSelectedHomeLocationLat] = useState<
        string | null
    >(null);
    const [selectedHomeLocationLng, setSelectedHomeLocationLng] = useState<
        string | null
    >(null);
    const handleCurrentLocationSelect = (lat: number, lng: number) => {
        const location = {
            lat: lat.toFixed(9).toString(),
            lng: lng.toFixed(9).toString(),
        };
        form.setValue("currentAddressLatitude", location.lat);
        form.setValue("currentAddressLongitude", location.lng);
    };
    const handleHomeLocationSelect = (lat: number, lng: number) => {
        const location = {
            lat: lat.toFixed(9).toString(),
            lng: lng.toFixed(9).toString(),
        };
        form.setValue("hometownAddressLatitude", location.lat);
        form.setValue("hometownAddressLongitude", location.lng);
    };

    // FORM
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });
    useEffect(() => {
        (Object.keys(studentData) as Array<keyof Student>).forEach((key) => {
            if (key in formSchema.shape && studentData[key] != null) {
                if (
                    key === "nationalityId" &&
                    typeof studentData[key] === "number"
                ) {
                    form.setValue(key, studentData[key]);
                    setSelectedCountry(studentData[key]);
                } else if (
                    key === "currentAddressProvinceId" &&
                    typeof studentData[key] === "number"
                ) {
                    form.setValue(key, studentData[key]);
                    setSelectedCurrentProvince(studentData[key]);
                } else if (
                    key === "hometownAddressProvinceId" &&
                    typeof studentData[key] === "number"
                ) {
                    form.setValue(key, studentData[key]);
                    setSelectedHomeProvince(studentData[key]);
                } else if (
                    key === "currentAddressLatitude" &&
                    typeof studentData[key] === "string"
                ) {
                    form.setValue(key, studentData[key]);
                    setSelectedCurrentLocationLat(studentData[key]);
                } else if (
                    key === "currentAddressLongitude" &&
                    typeof studentData[key] === "string"
                ) {
                    form.setValue(key, studentData[key]);
                    setSelectedCurrentLocationLng(studentData[key]);
                } else if (
                    key === "hometownAddressLatitude" &&
                    typeof studentData[key] === "string"
                ) {
                    form.setValue(key, studentData[key]);
                    setSelectedHomeLocationLat(studentData[key]);
                } else if (
                    key === "hometownAddressLongitude" &&
                    typeof studentData[key] === "string"
                ) {
                    form.setValue(key, studentData[key]);
                    setSelectedHomeLocationLng(studentData[key]);
                } else if (key in formSchema.shape) {
                    form.setValue(
                        key as keyof z.infer<typeof formSchema>,
                        studentData[key] as never,
                    );
                }
            }
        });
    }, [form, studentData]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        await updateStudent({
            id: studentData.id,
            nationalId: values.nationalId,
            lineId: values.lineId,
            facebook: values.facebook,
            email: values.email,
            phoneNumber: values.phoneNumber,
            nationalityId: values.nationalityId,
            religionId: values.religionId,
            currentAddressProvinceId: values.currentAddressProvinceId,
            currentAddressDistrictId: values.currentAddressDistrictId,
            currentAddressOther: values.currentAddressOther,
            currentAddressLatitude: values.currentAddressLatitude,
            currentAddressLongitude: values.currentAddressLongitude,
            hometownAddressProvinceId: values.hometownAddressProvinceId,
            hometownAddressDistrictId: values.hometownAddressDistrictId,
            hometownAddressOther: values.hometownAddressOther,
            hometownAddressLatitude: values.hometownAddressLatitude,
            hometownAddressLongitude: values.hometownAddressLongitude,
        });

        router.push("/register/onboarding/step-three");
    }

    // HANDLERS
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [selectedCurrentProvince, setSelectedCurrentProvince] = useState(0);
    const [selectedHomeProvince, setSelectedHomeProvince] = useState(0);

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
                                    value={
                                        countries.find(
                                            (country) =>
                                                country.id === field.value,
                                        )?.name ?? undefined
                                    }
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
                                    value={
                                        religions.find(
                                            (religion) =>
                                                religion.id === field.value,
                                        )?.nameTh ?? undefined
                                    }
                                    onValueChange={(value) => {
                                        const selectedReligion = religions.find(
                                            (religion) =>
                                                religion.nameTh === value,
                                        );
                                        if (!selectedReligion) {
                                            return;
                                        }
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
                                <FormDescription>
                                    กรอกในรูปแบบ 0XX-XXX-XXXX
                                </FormDescription>
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
                    <div className="h-60 overflow-hidden rounded-lg border-[6px] border-white">
                        <GoogleMap
                            onLocationSelect={handleCurrentLocationSelect}
                            selectedLocation={
                                selectedCurrentLocationLat &&
                                selectedCurrentLocationLng
                                    ? {
                                          lat: parseFloat(
                                              selectedCurrentLocationLat,
                                          ),
                                          lng: parseFloat(
                                              selectedCurrentLocationLng,
                                          ),
                                      }
                                    : undefined
                            }
                            width="100%"
                            height="100%"
                            placeholder="ระบุตำแหน่งที่อยู่ปัจจุบัน"
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="currentAddressLatitude"
                        render={({ field }) => (
                            <FormItem>
                                <Input type="hidden" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currentAddressLongitude"
                        render={({ field }) => (
                            <FormItem>
                                <Input type="hidden" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="currentAddressProvinceId"
                        render={({ field }) => (
                            <FormItem className="!pt-0">
                                <FormLabel>จังหวัดที่อยู่ปัจจุบัน</FormLabel>
                                <Select
                                    value={
                                        field.value
                                            ? provinces.find(
                                                  (province) =>
                                                      province.id ===
                                                      field.value,
                                              )?.nameTh
                                            : undefined
                                    }
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
                                            selectedProvinceString.id,
                                        );
                                        setSelectedCurrentProvince(
                                            selectedProvinceString.id,
                                        );
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกจังหวัดที่อยู่ปัจจุบัน" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
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
                                    value={
                                        field.value
                                            ? districts.find(
                                                  (district) =>
                                                      district.id ===
                                                      field.value,
                                              )?.nameTh
                                            : undefined
                                    }
                                    onValueChange={(value) => {
                                        const selectedDistrict = districts.find(
                                            (district) =>
                                                district.nameTh === value,
                                        );
                                        if (!selectedDistrict) {
                                            return;
                                        }
                                        field.onChange(selectedDistrict.id);
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
                                                const selectedCurrentProvinceCode =
                                                    provinces.find(
                                                        (province) =>
                                                            province.id ===
                                                            selectedCurrentProvince,
                                                    )?.provinceCode;
                                                return (
                                                    district.provinceCode ===
                                                    selectedCurrentProvinceCode
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

                {selectedCountry === 215 ? ( // Thailand
                    <section className="flex flex-col gap-2">
                        <div className="h-60 overflow-hidden rounded-lg border-[6px] border-white">
                            <GoogleMap
                                onLocationSelect={handleHomeLocationSelect}
                                selectedLocation={
                                    selectedHomeLocationLat &&
                                    selectedHomeLocationLng
                                        ? {
                                              lat: parseFloat(
                                                  selectedHomeLocationLat,
                                              ),
                                              lng: parseFloat(
                                                  selectedHomeLocationLng,
                                              ),
                                          }
                                        : undefined
                                }
                                width="100%"
                                height="100%"
                                placeholder="ระบุตำแหน่งที่อยู่ภูมิลำเนา"
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="hometownAddressLatitude"
                            render={({ field }) => (
                                <FormItem>
                                    <Input type="hidden" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hometownAddressLongitude"
                            render={({ field }) => (
                                <FormItem>
                                    <Input type="hidden" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="hometownAddressProvinceId"
                            render={({ field }) => (
                                <FormItem className="!pt-0">
                                    <FormLabel>
                                        จังหวัดที่อยู่ภูมิลำเนา
                                    </FormLabel>
                                    <Select
                                        value={
                                            field.value
                                                ? provinces.find(
                                                      (province) =>
                                                          province.id ===
                                                          field.value,
                                                  )?.nameTh
                                                : undefined
                                        }
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
                                                selectedProvinceString?.id,
                                            );
                                            setSelectedHomeProvince(
                                                selectedProvinceString?.id,
                                            );
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
                                        value={
                                            field.value
                                                ? districts.find(
                                                      (district) =>
                                                          district.id ===
                                                          field.value,
                                                  )?.nameTh
                                                : undefined
                                        }
                                        onValueChange={(value) => {
                                            const selectedDistrict =
                                                districts.find(
                                                    (district) =>
                                                        district.nameTh ===
                                                        value,
                                                );
                                            field.onChange(
                                                selectedDistrict?.id,
                                            );
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
                                                    const selectedHomeProvinceCode =
                                                        provinces.find(
                                                            (province) =>
                                                                province.id ===
                                                                selectedHomeProvince,
                                                        )?.provinceCode;
                                                    return (
                                                        district.provinceCode ===
                                                        selectedHomeProvinceCode
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
                ) : (
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
                )}

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

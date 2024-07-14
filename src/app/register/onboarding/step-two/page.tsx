"use client";
import {
    Form,
    FormControl,
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
import { useEffect , useState } from "react";
import GoogleMap from "@/components/maps/maps";
import { fetchData } from "./action";

interface Country {
  code: string | null;
  name: string | null;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
}

interface Province {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    nameTh: string | null;
    nameEn: string | null;
    provinceCode: number | null; // Allow provinceCode to be number or null
};

interface District {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    nameTh: string | null;
    nameEn: string | null;
    provinceCode: number | null;
    districtCode: number | null;
    postalCode: number | null;
}

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

    const handleLocationSelect = (lat: string, lng: string) => {
        form.setValue("currentAddressLatitude", lat);
        form.setValue("currentAddressLongitude", lng);
        console.log(`Selected location: Latitude: ${lat}, Longitude: ${lng}`);
    };

    const [countries, setCountries] = useState<Country[]>([]);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedProvince, setSelectedProvince] = useState(0);
    console.log(countries);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData();
                console.log(data);
                if(data != null){
                    setCountries(data.countries);
                    setProvinces(data.thaiProvinces);
                    setDistricts(data.thaiDistricts);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);


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
                        name="nationalityId"
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
                    <div className="rounded-lg border-[6px] border-white overflow-hidden h-60">
                        <GoogleMap onLocationSelect={handleLocationSelect} width="100%" height="100%" placeholder="ระบุตำแหน่งที่อยู่ปัจจุบัน"/>
                    </div>

                    <FormField
                        control={form.control}
                        name="currentAddressProvinceId"
                        render={({ field }) => (
                            <FormItem className="!pt-0">
                                <FormLabel>จังหวัดที่อยู่ปัจจุบัน</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        const selectedProvinceString = provinces.find(province => province.nameTh === value);
                                        field.onChange(selectedProvinceString?.provinceCode);
                                        setSelectedProvince(selectedProvinceString?.provinceCode);
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
                                            <SelectItem key={province.provinceCode} value={province.nameTh}>
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
                                        const selectedDistrict = districts.find(district => district.nameTh === value);
                                        field.onChange(selectedDistrict?.districtCode);
                                        // Additional logic to update districts based on selected province
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกเขตที่อยู่ปัจจุบัน" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {districts.filter(district => {
                                            console.log('Filtering Districts for Province Code:', selectedProvince); // Debugging
                                            return district.provinceCode === selectedProvince;
                                        }).map((district) => (
                                            <SelectItem key={district.districtCode} value={district.nameTh}>
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
                    <div className="rounded-lg border-[6px] border-white overflow-hidden h-60">
                        <GoogleMap onLocationSelect={handleLocationSelect} width="100%" height="100%" placeholder="ระบุตำแหน่งที่อยู่ภูมิลำเนา" />
                    </div>

                    <FormField
                        control={form.control}
                        name="nationalityId"
                        render={({ field }) => (
                            <FormItem className="!pt-0">
                                <FormLabel>ประเทศที่อยู่ภูมิลำเนา</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        console.log(value);
                                        const selectedCountry = countries.find(country => country.id === value);
                                        field.onChange(selectedCountry?.id);
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกประเทศที่อยู่ภูมิลำเนา" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {/* Map through nationalities data */}
                                        {countries.map((nationality, index) => (
                                            <SelectItem key={index} value={nationality.name}>
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
                        name="hometownAddressProvinceId"
                        render={({ field }) => (
                            <FormItem className="!pt-0">
                                <FormLabel>จังหวัดที่อยู่ภูมิลำเนา</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        const selectedProvinceString = provinces.find(province => province.nameTh === value);
                                        field.onChange(selectedProvinceString?.provinceCode);
                                        setSelectedProvince(selectedProvinceString?.provinceCode);
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
                                            <SelectItem key={province.provinceCode} value={province.nameTh}>
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
                                        const selectedDistrict = districts.find(district => district.nameTh === value);
                                        field.onChange(selectedDistrict?.districtCode);
                                        // Additional logic to update districts based on selected province
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="เลือกเขตที่อยู่ภูมิลำเนา" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {districts.filter(district => {
                                            console.log('Filtering Districts for Province Code:', selectedProvince); // Debugging
                                            return district.provinceCode === selectedProvince;
                                        }).map((district) => (
                                            <SelectItem key={district.districtCode} value={district.nameTh}>
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
                <Button type="submit" className="self-end" size="lg">
                    ถัดไป
                </Button>
            </form>
        </Form>
    );
}

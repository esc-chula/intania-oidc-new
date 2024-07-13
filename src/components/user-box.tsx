import ESCLogoWithoutText from "@/app/_components/esc/ESCLogoWithoutText";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export const UserBox = () => {
    return (
        <div className="relative flex size-full flex-col gap-16 rounded-2xl p-12 md:aspect-[614/764] md:bg-card md:shadow-md lg:aspect-[1024/460] lg:grid-cols-2 lg:flex-row lg:p-14">
            <div className="flex w-full flex-col items-center gap-10 text-center md:items-start md:text-start">
                <ESCLogoWithoutText className="h-14 w-fit fill-primary md:h-16" />
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold md:text-3xl">
                        เข้าสู่ระบบ
                    </h2>
                    <h1 className="text-5xl font-bold text-primary md:text-6xl">
                        INTANIA
                    </h1>
                    <p className="font-medium text-muted-foreground md:text-xl">
                        ใช้รหัส CUNET เพื่อเข้าสู่ระบบ
                    </p>
                </div>
            </div>
            <div className="flex w-full flex-col items-center gap-5 lg:place-self-center">
                <div className="flex w-full flex-col gap-2">
                    <Label className="text-muted-foreground">รหัสนิสิต</Label>
                    <Input />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <Label className="text-muted-foreground">รหัสผ่าน</Label>
                    <Input />
                </div>
            </div>
            <Button
                className="self-end text-base md:absolute md:bottom-12 md:right-12 md:text-xl lg:bottom-14 lg:right-14"
                size="lg"
            >
                ถัดไป
            </Button>
        </div>
    );
};

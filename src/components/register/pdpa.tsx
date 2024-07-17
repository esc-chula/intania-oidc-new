"use client";

import { LucideChevronDown } from "lucide-react";
import { useState } from "react";

export default function Pdpa() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className={`relative space-y-4 overflow-hidden font-normal text-muted-foreground ${expanded ? "h-auto" : "h-96"}`}
        >
            <>
                <p className="font-semibold">ขอบเขตนโยบาย</p>

                <p>
                    นโยบายนี้ครอบคลุมถึงการเก็บรวบรวม ใช้ เปิดเผย
                    และจัดเก็บข้อมูลส่วนบุคคลของนิสิตใหม่ที่เข้าศึกษาที่คณะวิศวกรรมศาสตร์
                    จุฬาลงกรณ์มหาวิทยาลัย รวมถึงข้อมูลที่ได้จากการลงทะเบียน
                    กิจกรรมภายในคณะ และการใช้บริการต่างๆ ของคณะฯ
                </p>

                <p className="font-semibold">การเก็บรวบรวมข้อมูล</p>

                <p>
                    คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                    จะเก็บรวบรวมข้อมูลส่วนบุคคลของนิสิตใหม่เฉพาะข้อมูลที่จำเป็นต่อการเป็นอยู่ของนิสิต
                    งานทะเบียน กิจกรรมภายในคณะ และการให้บริการต่างๆ
                </p>

                <p className="font-semibold">การใช้ข้อมูล</p>

                <p>
                    ข้อมูลส่วนบุคคลของนิสิตใหม่จะถูกใช้เพื่อวัตถุประสงค์ดังต่อไปนี้:
                </p>

                <ul className="list-inside list-disc">
                    <li>การลงทะเบียนและการจัดการศึกษาของนิสิตใหม่</li>
                    <li>การประสานงานและการสื่อสารกับนิสิตใหม่</li>
                    <li>การให้บริการต่าง ๆ ที่เกี่ยวข้องกับการศึกษา</li>
                    <li>การให้บริการต่าง ๆ ที่เกี่ยวข้องกับกิจกรรม</li>
                    <li>การจัดทำเอกสารที่เกี่ยวข้อง</li>
                </ul>

                <p className="font-semibold">การเปิดเผยข้อมูล</p>

                <p>
                    คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                    จะเปิดเผยข้อมูลเบื้องต้นให้แก่ กรรมการนิสิตคณะวิศวกรรมศาสตร์
                    จุฬาลงกรณ์มหาวิทยาลัย เพื่อเป็นประโยชน์ต่อการประสานงาน
                    งานทะเบียน และกิจกรรมภายในคณะฯ
                    และจะไม่เปิดเผยข้อมูลส่วนบุคคลของนิสิตใหม่แก่บุคคลภายนอกโดยไม่ได้รับความยินยอมจากนิสิตใหม่
                    ยกเว้นในกรณีที่เป็นไปตามกฎหมายหรือมีคำสั่งศาล
                </p>

                <p className="font-semibold">สิทธิของนิสิตใหม่</p>

                <p>
                    นิสิตใหม่มีสิทธิในการเข้าถึงข้อมูลส่วนบุคคลของตนเอง
                    สามารถขอแก้ไข ลบ
                    หรือระงับการใช้ข้อมูลส่วนบุคคลได้ตามข้อกำหนด
                    ซึ่งสามารถร้องขอผ่านอีเมล tech@intania.org
                </p>

                <p className="font-semibold">การเปลี่ยนแปลงนโยบาย</p>

                <p>
                    คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย และ
                    กรรมการนิสิตคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                    อาจทำการปรับปรุงหรือเปลี่ยนแปลงนโยบายนี้ได้ตามความเหมาะสม
                    โดยจะแจ้งให้ทราบผ่านทางเว็บไซต์ accounts.intania.org
                </p>
            </>

            <div
                className={`absolute bottom-0 left-0 right-0 z-50 flex h-2/3 items-end justify-center bg-gradient-to-t from-white to-transparent ${expanded ? "hidden" : ""}`}
            >
                <button
                    type="button"
                    onClick={() => {
                        setExpanded((prev) => !prev);
                    }}
                    className="absolute bottom-6 flex items-center gap-2 font-medium text-primary"
                >
                    <span>อ่านเพิ่มเติม</span>
                    <LucideChevronDown size={20} />
                </button>
            </div>
        </div>
    );
}

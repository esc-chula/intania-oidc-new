import Link from "next/link";

export default function LoginFooter() {
    return (
        <footer className="-mt-6 flex w-full justify-center gap-10 py-7 pr-6 text-sm font-medium text-foreground/50 md:mt-0 md:justify-end md:text-base">
            <Link href="#">ความช่วยเหลือ</Link>
            <Link href="#">ความเป็นส่วนตัว</Link>
        </footer>
    );
}

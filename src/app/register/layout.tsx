export const metadata = {
    title: "ลงทะเบียนนิสิตใหม่ - Intania Accounts",
    description:
        "ระบบลงทะเบียนนิสิตใหม่ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <section className="mx-auto max-w-screen-sm">{children}</section>;
}

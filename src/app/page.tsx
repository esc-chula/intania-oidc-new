import ESCLogoWithoutText from "@/components/esc/ESCLogoWithoutText";
import { Footer } from "@/components/footer";
import { UserBox } from "@/components/user-box";

export default async function Home() {
    return (
        <>
            <div className="flex size-full flex-col items-center">
                <section className="absolute top-1/2 flex size-full max-w-3xl -translate-y-1/2 flex-col items-center justify-between md:h-auto md:justify-center md:px-32 lg:max-w-6xl">
                    <UserBox />
                    <Footer />
                </section>
            </div>
            <div className="pointer-events-none relative -z-50 h-dvh w-dvw select-none overflow-hidden">
                <ESCLogoWithoutText
                    className="absolute -bottom-[30dvh] -right-[10dvw] -z-50 w-[60dvw] rotate-[-12deg]"
                    fill={"hsla(0, 0%, 0%, 0.03)"}
                />
                <div className="absolute left-0 top-0 -z-50 size-[150dvw] -translate-x-1/2 -translate-y-2/3 bg-background-gradient-prop opacity-20" />
                <div className="absolute left-0 top-0 -z-50 size-[80dvw] -translate-x-2/3 -translate-y-[90%] bg-background-gradient-prop" />
            </div>
        </>
    );
}

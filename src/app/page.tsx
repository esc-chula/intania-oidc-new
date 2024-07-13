import { Footer } from "@/components/footer";
import { UserBox } from "@/components/user-box";

export default async function Home() {
    return (
        <div className="flex size-full flex-col items-center">
            <section className="absolute top-1/2 flex size-full max-w-3xl -translate-y-1/2 flex-col items-center justify-between md:h-auto md:justify-center md:px-32 lg:max-w-6xl">
                <UserBox />
                <Footer />
            </section>
        </div>
    );
}

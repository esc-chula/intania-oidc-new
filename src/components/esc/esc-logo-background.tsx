import ESCLogoWithoutText from "./esc-logo-without-text";

export default function ESCLogoBackground() {
    return (
        <div className="pointer-events-none relative -z-50 h-dvh w-dvw select-none overflow-hidden">
            <ESCLogoWithoutText
                className="absolute -bottom-[30dvh] -right-[10dvw] -z-50 w-[60dvw] rotate-[-12deg]"
                fill={"hsla(0, 0%, 0%, 0.03)"}
            />
            <div className="absolute left-0 top-0 -z-50 size-[150dvw] -translate-x-1/2 -translate-y-2/3 bg-background-gradient-prop opacity-20" />
            <div className="absolute left-0 top-0 -z-50 size-[80dvw] -translate-x-2/3 -translate-y-[90%] bg-background-gradient-prop" />
        </div>
    );
}

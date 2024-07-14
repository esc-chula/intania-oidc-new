"use client";
import { Button } from "@/components/ui/button";
import { useUserForm } from "@/contexts/form-context";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Progress = () => {
    const { step, setStep } = useUserForm();
    const router = useRouter();

    return (
        <>
            <div className="grid w-full grid-cols-5 gap-2.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={
                            step < i + 1
                                ? {
                                      opacity: 0.4,
                                      backgroundColor:
                                          "hsl(var(--muted-foreground))",
                                  }
                                : {
                                      opacity: 1,
                                      backgroundColor: "hsl(var(--primary))",
                                  }
                        }
                        transition={{ ease: "easeInOut", duration: 0.15 }}
                        className={cn("h-2 w-full rounded-full")}
                    />
                ))}
            </div>
            <Button
                className="absolute top-12 gap-2 self-start pl-0 text-base font-medium text-secondary-foreground"
                variant="link"
                onClick={() => {
                    setStep((prev) => prev - 1);
                    router.back();
                }}
            >
                <ArrowLeftIcon className="size-6" />
                กลับ
            </Button>
        </>
    );
};

export default Progress;

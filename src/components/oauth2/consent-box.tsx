"use client";
import ESCLogoWithoutText from "@/components/esc/esc-logo-without-text";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    handleOAuthAcceptConsent,
    handleOAuthRejectConsent,
} from "@/server/actions/oauth";
import { useSearchParams } from "next/navigation";

interface AccountSelectionBoxProps {
    appName?: string;
    studentId?: string;
    studentName?: string;
    sharedResources: string[];
}

export default function AccountSelectionBox(props: AccountSelectionBoxProps) {
    const [error, setError] = useState<string | null>(null);
    const params = useSearchParams();

    async function onSubmit(accept: boolean) {
        try {
            const consentChallengeParam = params.get("consent_challenge");

            if (!consentChallengeParam) {
                throw new Error("consent_challenge is undefined");
            }

            const consentChallenge: string = consentChallengeParam;

            if (accept) {
                await handleOAuthAcceptConsent(consentChallenge);
            } else {
                await handleOAuthRejectConsent(consentChallenge);
            }

            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    }

    return (
        <div className="relative flex size-full flex-col gap-16 rounded-2xl p-12 md:aspect-[614/764] md:bg-card md:shadow-md lg:aspect-[1024/460] lg:grid-cols-2 lg:flex-row lg:p-14">
            <div className="flex w-full flex-col justify-between text-center md:text-start">
                <div className="flex flex-col items-center gap-10 md:items-start">
                    <ESCLogoWithoutText className="h-14 w-fit fill-primary md:h-16" />
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-semibold">
                            ดำเนินการต่อใน
                        </h2>
                        <h1 className="text-5xl font-bold text-primary">
                            {props.appName
                                ? props.appName
                                : "Unknown Application"}
                        </h1>
                        <p className="pt-3 font-medium text-muted-foreground">
                            หากดำเนินการต่อ accounts.intania.org
                            จะแชร์ข้อมูลของคุณกับ{" "}
                            {props.appName
                                ? props.appName
                                : "Unknown Application"}
                        </p>
                    </div>
                </div>
                <p className="text-red-500">{error && error}</p>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-between gap-5 lg:place-self-center">
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <div className="text-muted-foreground">
                        {props.studentId ? props.studentId : "ไม่ระบุรหัสนิสิต"}
                    </div>
                    <div className="text-muted-foreground">
                        {props.studentName ? props.studentName : "ไม่ระบุชื่อ"}
                    </div>
                </div>
                <div className="flex w-full items-center justify-between md:bottom-12 lg:bottom-14">
                    <button
                        className="text-muted-foreground"
                        onClick={async () => await onSubmit(false)}
                    >
                        ยกเลิก
                    </button>
                    <Button
                        className="text-base md:text-xl"
                        size="default"
                        onClick={async () => await onSubmit(true)}
                    >
                        ถัดไป
                    </Button>
                </div>
            </div>
        </div>
    );
}

export type StudentInfo = {
    studentId: string;
};

export type ValidationResponse = {
    success: boolean;
    data?: StudentInfo;
    errors: string[];
};

type ProviderResponse = {
    success: true;
    valid: boolean;
} | {
    success: false;
    message: string;
}

export const studentProvider = {
    async checkCredential(username: string, password: string): Promise<ValidationResponse> {
        const result = await fetch(`${process.env.AUTH_ENDPOINT}`, {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
            headers: {
                Authorization: `Bearer ${process.env.AUTH_KEY}`,
                "Content-Type": "application/json"
            },
        }).then(data => data.json()) as ProviderResponse

        console.log({result})

        if (result.success) {
            if (result.valid) {
                return {
                    success: true,
                    data: {
                        studentId: username,
                    },
                    errors: [],
                };
            } else {
                return {
                    success: false,
                    errors: ["Incorrect password"],
                };
            }
        } else {
            return {
                success: false,
                errors: [result.message],
            };
        }
    },
};

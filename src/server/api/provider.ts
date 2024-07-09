export type StudentInfo = {
    studentId: string;
};

export type ValidationResponse = {
    success: boolean;
    data?: StudentInfo;
    errors: string[];
};

export const studentProvider = {
    checkCredential(username: string, password: string): ValidationResponse {
        // TODO: Check with chula
        if (username == password) {
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
    },
};

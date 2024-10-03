import { grpc } from "@/server/grpc"

export async function loginStudent(username: string, password: string) {
    const response = await grpc.account.studentLogin({
        username,
        password,
        verifyWithLdap: true,
    });

    return {
        success: true,
        data: response,
        errors: [],
    };
}

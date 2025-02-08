import { credentials, type ServiceError } from "@grpc/grpc-js";
import {
    AccountServiceClient,
    type IntrospectSessionRequest,
    type IntrospectSessionResponse,
    type MeRequest,
    type MeResponse,
    type StudentLoginRequest,
    type StudentLoginResponse,
} from "@/generated/intania/auth/account/v1/account";
import {
    type EditStudentRequest,
    type EditStudentResponse,
    type ListStudentMappingRequest,
    type ListStudentMappingResponse,
    StudentServiceClient,
} from "@/generated/intania/auth/student/v1/student";
import { env } from "next-runtime-env";

const addr = env("GRPC_ADDRESS") ?? "127.0.0.1:3001";

const accountClient = new AccountServiceClient(
    addr,
    credentials.createInsecure(),
);
const studentClient = new StudentServiceClient(
    addr,
    credentials.createInsecure(),
);

const INITIAL_FIXED_RETRY_COUNT = 10; // First 10 attempts use fixed delay
const FIXED_DELAY_MS = 5000; // 5 seconds delay for the first 10 retries
const INITIAL_EXPONENTIAL_DELAY_MS = 10000; // Start exponential backoff from 10s
const MAX_DELAY_MS = 120000; // Maximum delay capped at 2 minutes (120 seconds)

async function retry<T>(operation: () => Promise<T>): Promise<T> {
    let attempt = 0;
    let delay = FIXED_DELAY_MS;

    while (true) {
        try {
            return await operation();
        } catch (err) {
            if (err instanceof Error) {
                console.error(
                    `Error occurred (attempt ${attempt + 1}): ${err.message}`,
                );
            }

            attempt++;

            if (attempt <= INITIAL_FIXED_RETRY_COUNT) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
            } else {
                delay = Math.min(
                    INITIAL_EXPONENTIAL_DELAY_MS *
                        Math.pow(2, attempt - INITIAL_FIXED_RETRY_COUNT - 1),
                    MAX_DELAY_MS,
                );
                console.log(`Retrying in ${delay / 1000} seconds...`);
            }

            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}

function r<T>(
    resolve: (response: T) => void,
    reject: (reason?: ServiceError) => void,
) {
    return function (err: ServiceError | null, response: T) {
        if (err) {
            return reject(err);
        }
        return resolve(response);
    };
}

function studentLogin(req: StudentLoginRequest): Promise<StudentLoginResponse> {
    return retry(() => {
        return new Promise((resolve, reject) => {
            accountClient.studentLogin(req, r(resolve, reject));
        });
    });
}

function me(req: MeRequest): Promise<MeResponse> {
    return retry(() => {
        return new Promise((resolve, reject) => {
            accountClient.me(req, r(resolve, reject));
        });
    });
}

function introspectSession(
    req: IntrospectSessionRequest,
): Promise<IntrospectSessionResponse> {
    return retry(() => {
        return new Promise((resolve, reject) => {
            accountClient.introspectSession(req, r(resolve, reject));
        });
    });
}

function listStudentMapping(
    req: ListStudentMappingRequest,
): Promise<ListStudentMappingResponse> {
    return retry(() => {
        return new Promise((resolve, reject) => {
            studentClient.listStudentMapping(req, r(resolve, reject));
        });
    });
}

function updateStudent(req: EditStudentRequest): Promise<EditStudentResponse> {
    return retry(() => {
        return new Promise((resolve, reject) => {
            studentClient.editStudent(req, r(resolve, reject));
        });
    });
}

export const grpc = {
    account: {
        studentLogin,
        me,
        introspectSession,
    },
    student: {
        listStudentMapping,
        updateStudent,
    },
};

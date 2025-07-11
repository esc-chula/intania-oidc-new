// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.2
//   protoc               v4.23.4
// source: intania/auth/account/v1/account.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import {
    type CallOptions,
    ChannelCredentials,
    Client,
    type ClientOptions,
    type ClientUnaryCall,
    type handleUnaryCall,
    makeGenericClientConstructor,
    Metadata,
    type ServiceError,
    type UntypedServiceImplementation,
} from "@grpc/grpc-js";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { Student } from "../../student/v1/student";

export const protobufPackage = "intania.auth.account.v1";

export enum AccountType {
    ACCOUNT_TYPE_UNSPECIFIED = 0,
    ACCOUNT_TYPE_STUDENT = 1,
    UNRECOGNIZED = -1,
}

export function accountTypeFromJSON(object: any): AccountType {
    switch (object) {
        case 0:
        case "ACCOUNT_TYPE_UNSPECIFIED":
            return AccountType.ACCOUNT_TYPE_UNSPECIFIED;
        case 1:
        case "ACCOUNT_TYPE_STUDENT":
            return AccountType.ACCOUNT_TYPE_STUDENT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return AccountType.UNRECOGNIZED;
    }
}

export function accountTypeToJSON(object: AccountType): string {
    switch (object) {
        case AccountType.ACCOUNT_TYPE_UNSPECIFIED:
            return "ACCOUNT_TYPE_UNSPECIFIED";
        case AccountType.ACCOUNT_TYPE_STUDENT:
            return "ACCOUNT_TYPE_STUDENT";
        case AccountType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}

export interface StudentLoginRequest {
    username: string;
    password: string;
    verifyWithLdap: boolean;
}

export interface StudentLoginResponse {
    session: Session | undefined;
    account: Account | undefined;
    student: Student | undefined;
}

export interface MeRequest {
    sessionId: string;
}

export interface MeResponse {
    session: Session | undefined;
    account: Account | undefined;
    student?: Student | undefined;
}

export interface IntrospectSessionRequest {
    sessionId: string;
}

export interface IntrospectSessionResponse {
    session: Session | undefined;
}

export interface Session {
    /**
     * Session id
     *
     * This field is sentitive data and should be handle with caution.
     */
    id: string;
    /** Internal account id, include for completeness purpose. */
    accountId: number;
    /** Session expiration time. */
    expiresAt: Date | undefined;
}

export interface Account {
    /** Id of the account, unique across all account. */
    id: number;
    /** Type of the account, current can only be student. */
    type: AccountType;
    /** Refer to id on the respective table. */
    externalId: number;
    /** Public id to be used by use to provide randomness. */
    publicId: string;
}

function createBaseStudentLoginRequest(): StudentLoginRequest {
    return { username: "", password: "", verifyWithLdap: false };
}

export const StudentLoginRequest: MessageFns<StudentLoginRequest> = {
    encode(
        message: StudentLoginRequest,
        writer: BinaryWriter = new BinaryWriter(),
    ): BinaryWriter {
        if (message.username !== "") {
            writer.uint32(10).string(message.username);
        }
        if (message.password !== "") {
            writer.uint32(18).string(message.password);
        }
        if (message.verifyWithLdap !== false) {
            writer.uint32(24).bool(message.verifyWithLdap);
        }
        return writer;
    },

    decode(
        input: BinaryReader | Uint8Array,
        length?: number,
    ): StudentLoginRequest {
        const reader =
            input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStudentLoginRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }

                    message.username = reader.string();
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }

                    message.password = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }

                    message.verifyWithLdap = reader.bool();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },

    fromJSON(object: any): StudentLoginRequest {
        return {
            username: isSet(object.username)
                ? globalThis.String(object.username)
                : "",
            password: isSet(object.password)
                ? globalThis.String(object.password)
                : "",
            verifyWithLdap: isSet(object.verifyWithLdap)
                ? globalThis.Boolean(object.verifyWithLdap)
                : false,
        };
    },

    toJSON(message: StudentLoginRequest): unknown {
        const obj: any = {};
        if (message.username !== "") {
            obj.username = message.username;
        }
        if (message.password !== "") {
            obj.password = message.password;
        }
        if (message.verifyWithLdap !== false) {
            obj.verifyWithLdap = message.verifyWithLdap;
        }
        return obj;
    },

    create<I extends Exact<DeepPartial<StudentLoginRequest>, I>>(
        base?: I,
    ): StudentLoginRequest {
        return StudentLoginRequest.fromPartial(base ?? ({} as any));
    },
    fromPartial<I extends Exact<DeepPartial<StudentLoginRequest>, I>>(
        object: I,
    ): StudentLoginRequest {
        const message = createBaseStudentLoginRequest();
        message.username = object.username ?? "";
        message.password = object.password ?? "";
        message.verifyWithLdap = object.verifyWithLdap ?? false;
        return message;
    },
};

function createBaseStudentLoginResponse(): StudentLoginResponse {
    return { session: undefined, account: undefined, student: undefined };
}

export const StudentLoginResponse: MessageFns<StudentLoginResponse> = {
    encode(
        message: StudentLoginResponse,
        writer: BinaryWriter = new BinaryWriter(),
    ): BinaryWriter {
        if (message.session !== undefined) {
            Session.encode(message.session, writer.uint32(10).fork()).join();
        }
        if (message.account !== undefined) {
            Account.encode(message.account, writer.uint32(18).fork()).join();
        }
        if (message.student !== undefined) {
            Student.encode(message.student, writer.uint32(26).fork()).join();
        }
        return writer;
    },

    decode(
        input: BinaryReader | Uint8Array,
        length?: number,
    ): StudentLoginResponse {
        const reader =
            input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStudentLoginResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }

                    message.session = Session.decode(reader, reader.uint32());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }

                    message.account = Account.decode(reader, reader.uint32());
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }

                    message.student = Student.decode(reader, reader.uint32());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },

    fromJSON(object: any): StudentLoginResponse {
        return {
            session: isSet(object.session)
                ? Session.fromJSON(object.session)
                : undefined,
            account: isSet(object.account)
                ? Account.fromJSON(object.account)
                : undefined,
            student: isSet(object.student)
                ? Student.fromJSON(object.student)
                : undefined,
        };
    },

    toJSON(message: StudentLoginResponse): unknown {
        const obj: any = {};
        if (message.session !== undefined) {
            obj.session = Session.toJSON(message.session);
        }
        if (message.account !== undefined) {
            obj.account = Account.toJSON(message.account);
        }
        if (message.student !== undefined) {
            obj.student = Student.toJSON(message.student);
        }
        return obj;
    },

    create<I extends Exact<DeepPartial<StudentLoginResponse>, I>>(
        base?: I,
    ): StudentLoginResponse {
        return StudentLoginResponse.fromPartial(base ?? ({} as any));
    },
    fromPartial<I extends Exact<DeepPartial<StudentLoginResponse>, I>>(
        object: I,
    ): StudentLoginResponse {
        const message = createBaseStudentLoginResponse();
        message.session =
            object.session !== undefined && object.session !== null
                ? Session.fromPartial(object.session)
                : undefined;
        message.account =
            object.account !== undefined && object.account !== null
                ? Account.fromPartial(object.account)
                : undefined;
        message.student =
            object.student !== undefined && object.student !== null
                ? Student.fromPartial(object.student)
                : undefined;
        return message;
    },
};

function createBaseMeRequest(): MeRequest {
    return { sessionId: "" };
}

export const MeRequest: MessageFns<MeRequest> = {
    encode(
        message: MeRequest,
        writer: BinaryWriter = new BinaryWriter(),
    ): BinaryWriter {
        if (message.sessionId !== "") {
            writer.uint32(10).string(message.sessionId);
        }
        return writer;
    },

    decode(input: BinaryReader | Uint8Array, length?: number): MeRequest {
        const reader =
            input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMeRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }

                    message.sessionId = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },

    fromJSON(object: any): MeRequest {
        return {
            sessionId: isSet(object.sessionId)
                ? globalThis.String(object.sessionId)
                : "",
        };
    },

    toJSON(message: MeRequest): unknown {
        const obj: any = {};
        if (message.sessionId !== "") {
            obj.sessionId = message.sessionId;
        }
        return obj;
    },

    create<I extends Exact<DeepPartial<MeRequest>, I>>(base?: I): MeRequest {
        return MeRequest.fromPartial(base ?? ({} as any));
    },
    fromPartial<I extends Exact<DeepPartial<MeRequest>, I>>(
        object: I,
    ): MeRequest {
        const message = createBaseMeRequest();
        message.sessionId = object.sessionId ?? "";
        return message;
    },
};

function createBaseMeResponse(): MeResponse {
    return { session: undefined, account: undefined, student: undefined };
}

export const MeResponse: MessageFns<MeResponse> = {
    encode(
        message: MeResponse,
        writer: BinaryWriter = new BinaryWriter(),
    ): BinaryWriter {
        if (message.session !== undefined) {
            Session.encode(message.session, writer.uint32(10).fork()).join();
        }
        if (message.account !== undefined) {
            Account.encode(message.account, writer.uint32(18).fork()).join();
        }
        if (message.student !== undefined) {
            Student.encode(message.student, writer.uint32(26).fork()).join();
        }
        return writer;
    },

    decode(input: BinaryReader | Uint8Array, length?: number): MeResponse {
        const reader =
            input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }

                    message.session = Session.decode(reader, reader.uint32());
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }

                    message.account = Account.decode(reader, reader.uint32());
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }

                    message.student = Student.decode(reader, reader.uint32());
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },

    fromJSON(object: any): MeResponse {
        return {
            session: isSet(object.session)
                ? Session.fromJSON(object.session)
                : undefined,
            account: isSet(object.account)
                ? Account.fromJSON(object.account)
                : undefined,
            student: isSet(object.student)
                ? Student.fromJSON(object.student)
                : undefined,
        };
    },

    toJSON(message: MeResponse): unknown {
        const obj: any = {};
        if (message.session !== undefined) {
            obj.session = Session.toJSON(message.session);
        }
        if (message.account !== undefined) {
            obj.account = Account.toJSON(message.account);
        }
        if (message.student !== undefined) {
            obj.student = Student.toJSON(message.student);
        }
        return obj;
    },

    create<I extends Exact<DeepPartial<MeResponse>, I>>(base?: I): MeResponse {
        return MeResponse.fromPartial(base ?? ({} as any));
    },
    fromPartial<I extends Exact<DeepPartial<MeResponse>, I>>(
        object: I,
    ): MeResponse {
        const message = createBaseMeResponse();
        message.session =
            object.session !== undefined && object.session !== null
                ? Session.fromPartial(object.session)
                : undefined;
        message.account =
            object.account !== undefined && object.account !== null
                ? Account.fromPartial(object.account)
                : undefined;
        message.student =
            object.student !== undefined && object.student !== null
                ? Student.fromPartial(object.student)
                : undefined;
        return message;
    },
};

function createBaseIntrospectSessionRequest(): IntrospectSessionRequest {
    return { sessionId: "" };
}

export const IntrospectSessionRequest: MessageFns<IntrospectSessionRequest> = {
    encode(
        message: IntrospectSessionRequest,
        writer: BinaryWriter = new BinaryWriter(),
    ): BinaryWriter {
        if (message.sessionId !== "") {
            writer.uint32(10).string(message.sessionId);
        }
        return writer;
    },

    decode(
        input: BinaryReader | Uint8Array,
        length?: number,
    ): IntrospectSessionRequest {
        const reader =
            input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIntrospectSessionRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }

                    message.sessionId = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },

    fromJSON(object: any): IntrospectSessionRequest {
        return {
            sessionId: isSet(object.sessionId)
                ? globalThis.String(object.sessionId)
                : "",
        };
    },

    toJSON(message: IntrospectSessionRequest): unknown {
        const obj: any = {};
        if (message.sessionId !== "") {
            obj.sessionId = message.sessionId;
        }
        return obj;
    },

    create<I extends Exact<DeepPartial<IntrospectSessionRequest>, I>>(
        base?: I,
    ): IntrospectSessionRequest {
        return IntrospectSessionRequest.fromPartial(base ?? ({} as any));
    },
    fromPartial<I extends Exact<DeepPartial<IntrospectSessionRequest>, I>>(
        object: I,
    ): IntrospectSessionRequest {
        const message = createBaseIntrospectSessionRequest();
        message.sessionId = object.sessionId ?? "";
        return message;
    },
};

function createBaseIntrospectSessionResponse(): IntrospectSessionResponse {
    return { session: undefined };
}

export const IntrospectSessionResponse: MessageFns<IntrospectSessionResponse> =
    {
        encode(
            message: IntrospectSessionResponse,
            writer: BinaryWriter = new BinaryWriter(),
        ): BinaryWriter {
            if (message.session !== undefined) {
                Session.encode(
                    message.session,
                    writer.uint32(10).fork(),
                ).join();
            }
            return writer;
        },

        decode(
            input: BinaryReader | Uint8Array,
            length?: number,
        ): IntrospectSessionResponse {
            const reader =
                input instanceof BinaryReader ? input : new BinaryReader(input);
            let end = length === undefined ? reader.len : reader.pos + length;
            const message = createBaseIntrospectSessionResponse();
            while (reader.pos < end) {
                const tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1: {
                        if (tag !== 10) {
                            break;
                        }

                        message.session = Session.decode(
                            reader,
                            reader.uint32(),
                        );
                        continue;
                    }
                }
                if ((tag & 7) === 4 || tag === 0) {
                    break;
                }
                reader.skip(tag & 7);
            }
            return message;
        },

        fromJSON(object: any): IntrospectSessionResponse {
            return {
                session: isSet(object.session)
                    ? Session.fromJSON(object.session)
                    : undefined,
            };
        },

        toJSON(message: IntrospectSessionResponse): unknown {
            const obj: any = {};
            if (message.session !== undefined) {
                obj.session = Session.toJSON(message.session);
            }
            return obj;
        },

        create<I extends Exact<DeepPartial<IntrospectSessionResponse>, I>>(
            base?: I,
        ): IntrospectSessionResponse {
            return IntrospectSessionResponse.fromPartial(base ?? ({} as any));
        },
        fromPartial<I extends Exact<DeepPartial<IntrospectSessionResponse>, I>>(
            object: I,
        ): IntrospectSessionResponse {
            const message = createBaseIntrospectSessionResponse();
            message.session =
                object.session !== undefined && object.session !== null
                    ? Session.fromPartial(object.session)
                    : undefined;
            return message;
        },
    };

function createBaseSession(): Session {
    return { id: "", accountId: 0, expiresAt: undefined };
}

export const Session: MessageFns<Session> = {
    encode(
        message: Session,
        writer: BinaryWriter = new BinaryWriter(),
    ): BinaryWriter {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.accountId !== 0) {
            writer.uint32(16).int32(message.accountId);
        }
        if (message.expiresAt !== undefined) {
            Timestamp.encode(
                toTimestamp(message.expiresAt),
                writer.uint32(26).fork(),
            ).join();
        }
        return writer;
    },

    decode(input: BinaryReader | Uint8Array, length?: number): Session {
        const reader =
            input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSession();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }

                    message.id = reader.string();
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }

                    message.accountId = reader.int32();
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }

                    message.expiresAt = fromTimestamp(
                        Timestamp.decode(reader, reader.uint32()),
                    );
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },

    fromJSON(object: any): Session {
        return {
            id: isSet(object.id) ? globalThis.String(object.id) : "",
            accountId: isSet(object.accountId)
                ? globalThis.Number(object.accountId)
                : 0,
            expiresAt: isSet(object.expiresAt)
                ? fromJsonTimestamp(object.expiresAt)
                : undefined,
        };
    },

    toJSON(message: Session): unknown {
        const obj: any = {};
        if (message.id !== "") {
            obj.id = message.id;
        }
        if (message.accountId !== 0) {
            obj.accountId = Math.round(message.accountId);
        }
        if (message.expiresAt !== undefined) {
            obj.expiresAt = message.expiresAt.toISOString();
        }
        return obj;
    },

    create<I extends Exact<DeepPartial<Session>, I>>(base?: I): Session {
        return Session.fromPartial(base ?? ({} as any));
    },
    fromPartial<I extends Exact<DeepPartial<Session>, I>>(object: I): Session {
        const message = createBaseSession();
        message.id = object.id ?? "";
        message.accountId = object.accountId ?? 0;
        message.expiresAt = object.expiresAt ?? undefined;
        return message;
    },
};

function createBaseAccount(): Account {
    return { id: 0, type: 0, externalId: 0, publicId: "" };
}

export const Account: MessageFns<Account> = {
    encode(
        message: Account,
        writer: BinaryWriter = new BinaryWriter(),
    ): BinaryWriter {
        if (message.id !== 0) {
            writer.uint32(8).int32(message.id);
        }
        if (message.type !== 0) {
            writer.uint32(16).int32(message.type);
        }
        if (message.externalId !== 0) {
            writer.uint32(24).int32(message.externalId);
        }
        if (message.publicId !== "") {
            writer.uint32(34).string(message.publicId);
        }
        return writer;
    },

    decode(input: BinaryReader | Uint8Array, length?: number): Account {
        const reader =
            input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }

                    message.id = reader.int32();
                    continue;
                }
                case 2: {
                    if (tag !== 16) {
                        break;
                    }

                    message.type = reader.int32() as any;
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }

                    message.externalId = reader.int32();
                    continue;
                }
                case 4: {
                    if (tag !== 34) {
                        break;
                    }

                    message.publicId = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },

    fromJSON(object: any): Account {
        return {
            id: isSet(object.id) ? globalThis.Number(object.id) : 0,
            type: isSet(object.type) ? accountTypeFromJSON(object.type) : 0,
            externalId: isSet(object.externalId)
                ? globalThis.Number(object.externalId)
                : 0,
            publicId: isSet(object.publicId)
                ? globalThis.String(object.publicId)
                : "",
        };
    },

    toJSON(message: Account): unknown {
        const obj: any = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.type !== 0) {
            obj.type = accountTypeToJSON(message.type);
        }
        if (message.externalId !== 0) {
            obj.externalId = Math.round(message.externalId);
        }
        if (message.publicId !== "") {
            obj.publicId = message.publicId;
        }
        return obj;
    },

    create<I extends Exact<DeepPartial<Account>, I>>(base?: I): Account {
        return Account.fromPartial(base ?? ({} as any));
    },
    fromPartial<I extends Exact<DeepPartial<Account>, I>>(object: I): Account {
        const message = createBaseAccount();
        message.id = object.id ?? 0;
        message.type = object.type ?? 0;
        message.externalId = object.externalId ?? 0;
        message.publicId = object.publicId ?? "";
        return message;
    },
};

export type AccountServiceService = typeof AccountServiceService;
export const AccountServiceService = {
    studentLogin: {
        path: "/intania.auth.account.v1.AccountService/StudentLogin",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value: StudentLoginRequest) =>
            Buffer.from(StudentLoginRequest.encode(value).finish()),
        requestDeserialize: (value: Buffer) =>
            StudentLoginRequest.decode(value),
        responseSerialize: (value: StudentLoginResponse) =>
            Buffer.from(StudentLoginResponse.encode(value).finish()),
        responseDeserialize: (value: Buffer) =>
            StudentLoginResponse.decode(value),
    },
    /** Used to retrieve information about session and the user. */
    me: {
        path: "/intania.auth.account.v1.AccountService/Me",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value: MeRequest) =>
            Buffer.from(MeRequest.encode(value).finish()),
        requestDeserialize: (value: Buffer) => MeRequest.decode(value),
        responseSerialize: (value: MeResponse) =>
            Buffer.from(MeResponse.encode(value).finish()),
        responseDeserialize: (value: Buffer) => MeResponse.decode(value),
    },
    /** Used to retrieve information about session without user and account information. */
    introspectSession: {
        path: "/intania.auth.account.v1.AccountService/IntrospectSession",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value: IntrospectSessionRequest) =>
            Buffer.from(IntrospectSessionRequest.encode(value).finish()),
        requestDeserialize: (value: Buffer) =>
            IntrospectSessionRequest.decode(value),
        responseSerialize: (value: IntrospectSessionResponse) =>
            Buffer.from(IntrospectSessionResponse.encode(value).finish()),
        responseDeserialize: (value: Buffer) =>
            IntrospectSessionResponse.decode(value),
    },
} as const;

export interface AccountServiceServer extends UntypedServiceImplementation {
    studentLogin: handleUnaryCall<StudentLoginRequest, StudentLoginResponse>;
    /** Used to retrieve information about session and the user. */
    me: handleUnaryCall<MeRequest, MeResponse>;
    /** Used to retrieve information about session without user and account information. */
    introspectSession: handleUnaryCall<
        IntrospectSessionRequest,
        IntrospectSessionResponse
    >;
}

export interface AccountServiceClient extends Client {
    studentLogin(
        request: StudentLoginRequest,
        callback: (
            error: ServiceError | null,
            response: StudentLoginResponse,
        ) => void,
    ): ClientUnaryCall;
    studentLogin(
        request: StudentLoginRequest,
        metadata: Metadata,
        callback: (
            error: ServiceError | null,
            response: StudentLoginResponse,
        ) => void,
    ): ClientUnaryCall;
    studentLogin(
        request: StudentLoginRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (
            error: ServiceError | null,
            response: StudentLoginResponse,
        ) => void,
    ): ClientUnaryCall;
    /** Used to retrieve information about session and the user. */
    me(
        request: MeRequest,
        callback: (error: ServiceError | null, response: MeResponse) => void,
    ): ClientUnaryCall;
    me(
        request: MeRequest,
        metadata: Metadata,
        callback: (error: ServiceError | null, response: MeResponse) => void,
    ): ClientUnaryCall;
    me(
        request: MeRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: ServiceError | null, response: MeResponse) => void,
    ): ClientUnaryCall;
    /** Used to retrieve information about session without user and account information. */
    introspectSession(
        request: IntrospectSessionRequest,
        callback: (
            error: ServiceError | null,
            response: IntrospectSessionResponse,
        ) => void,
    ): ClientUnaryCall;
    introspectSession(
        request: IntrospectSessionRequest,
        metadata: Metadata,
        callback: (
            error: ServiceError | null,
            response: IntrospectSessionResponse,
        ) => void,
    ): ClientUnaryCall;
    introspectSession(
        request: IntrospectSessionRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (
            error: ServiceError | null,
            response: IntrospectSessionResponse,
        ) => void,
    ): ClientUnaryCall;
}

export const AccountServiceClient = makeGenericClientConstructor(
    AccountServiceService,
    "intania.auth.account.v1.AccountService",
) as unknown as {
    new (
        address: string,
        credentials: ChannelCredentials,
        options?: Partial<ClientOptions>,
    ): AccountServiceClient;
    service: typeof AccountServiceService;
    serviceName: string;
};

type Builtin =
    | Date
    | Function
    | Uint8Array
    | string
    | number
    | boolean
    | undefined;

export type DeepPartial<T> = T extends Builtin
    ? T
    : T extends globalThis.Array<infer U>
      ? globalThis.Array<DeepPartial<U>>
      : T extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : T extends {}
          ? { [K in keyof T]?: DeepPartial<T[K]> }
          : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
    ? P
    : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
          [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
      };

function toTimestamp(date: Date): Timestamp {
    const seconds = Math.trunc(date.getTime() / 1_000);
    const nanos = (date.getTime() % 1_000) * 1_000_000;
    return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
    let millis = (t.seconds || 0) * 1_000;
    millis += (t.nanos || 0) / 1_000_000;
    return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
    if (o instanceof globalThis.Date) {
        return o;
    } else if (typeof o === "string") {
        return new globalThis.Date(o);
    } else {
        return fromTimestamp(Timestamp.fromJSON(o));
    }
}

function isSet(value: any): boolean {
    return value !== null && value !== undefined;
}

export interface MessageFns<T> {
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    fromJSON(object: any): T;
    toJSON(message: T): unknown;
    create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
    fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}

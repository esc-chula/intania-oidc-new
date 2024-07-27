export type Session = {
    sessionType: SessionType;
    studentId: number;
    expiredAt: number;
};

export type SessionType = "student";

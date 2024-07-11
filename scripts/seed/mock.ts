import { db } from "@/server/db";
import { students } from "@/server/db/schema";

await db.insert(students).values([
    { studentId: "6530000021", email: "6530000021@student.chula.ac.th" },
    { studentId: "6530000121", email: "6530000121@student.chula.ac.th" },
    { studentId: "6530000221", email: "6530000221@student.chula.ac.th" },
]);

process.exit(0);

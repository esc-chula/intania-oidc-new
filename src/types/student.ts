import { type studentDto } from "@/server/api/dto";
import { type z } from "zod";

export type Student = z.infer<typeof studentDto>;

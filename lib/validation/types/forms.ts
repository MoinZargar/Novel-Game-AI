import * as z from "zod";
import { actionSchema } from "@/lib/validation/action-schema";

export type ActionType = z.infer<typeof actionSchema>
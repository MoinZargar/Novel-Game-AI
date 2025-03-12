import * as z from "zod";

export const actionSchema = z.object({
    action: z.string()
    .min(1, {
      message: "Please enter an action.",
    })
    .max(800, {
      message: "Action is too long.",
    }),
});
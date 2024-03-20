import { z } from "zod";

export const bioSchema = z.object({
  bio: z
    .string()
    .min(200, { message: "Mínimo de 200 caracteres" })
    .max(800, { message: "Máximo de 800 caracteres" }),
});

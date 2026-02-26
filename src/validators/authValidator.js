import { z } from "zod";

const registerSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.email("Must be a valid email").trim().toLowerCase(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .refine((val) => !/\s/.test(val), "Password cannot contain spaces"),
});

const loginSchema = z.object({
    email: z.email("Must be a valid email").trim().toLowerCase(),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export { registerSchema, loginSchema };

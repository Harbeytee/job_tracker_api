import { z } from "zod";

const ResetPasswordSchema = z
  .object({
    key: z.string().min(1, "Key is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "ConfirmPassword is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default ResetPasswordSchema;

import { z } from "zod";

export const coverLetterBodySchema = z.object({
  cvUrl: z
    .string({ required_error: "cvUrl must be a valid URL" })
    .url({ message: "cvUrl must be a valid URL" }),
  jobTitle: z
    .string({ required_error: "jobTitle is required" })
    .min(1, { message: "jobTitle is required" }),
  company: z
    .string({ required_error: "jobTitle is required" })
    .min(1, { message: "company is required" }),
});

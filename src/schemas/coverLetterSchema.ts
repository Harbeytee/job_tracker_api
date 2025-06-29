import { z } from "zod";

export const CoverLetterBodySchema = z.object({
  cvUrl: z
    .string({ required_error: "cvUrl must be a valid URL" })
    .url({ message: "cvUrl must be a valid URL" })
    .refine((url) => url.endsWith(".pdf") || url.endsWith(".docx"), {
      message: "Unsupported file type. Only PDF and DOCX are allowed.",
    }),
  jobTitle: z
    .string({ required_error: "jobTitle is required" })
    .min(1, { message: "jobTitle is required" }),
  company: z
    .string({ required_error: "jobTitle is required" })
    .min(1, { message: "company is required" }),
});

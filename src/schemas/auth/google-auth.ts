import { z } from "zod";

const GoogleAuthSchema = z.object({
  code: z
    .string({ required_error: "Code is required" })
    .min(1, "Code code cannot be empty"),

  action: z.enum(["sign_in", "sign_up"], {
    required_error: "Action is required",
    invalid_type_error: "Action must be either sign_in or sign_up",
  }),
});

export default GoogleAuthSchema;

import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is too short"),
    secondName: z.string().min(2, "Last name is too short"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      ),
    rePassword: z.string().min(8, "Confirm password is required"),
    dateOfBirth: z.string().nonempty("Date of birth is required"),
    gender: z.enum(["male", "female"], {
      errorMap: () => ({ message: "Gender is required" }),
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

import { User } from "@prisma/client";
import * as Yup from "yup";

export const userSchema = Yup.object<Partial<User>>().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Hah. Please keep it sweet and short")
    .required("Please provide your name"),
  bio: Yup.string().min(5, "Too short...").required("Please provide a bio"),
  role: Yup.string()
    .min(2, "Too short...")
    .max(50, "Please keep it short")
    .required(
      "Please provide your current role. E.g Software Developer, Freelancer."
    ),
});

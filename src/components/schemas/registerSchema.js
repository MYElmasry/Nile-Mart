import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const registerSchema = yup.object().shape({
  name: yup.object({
    firstname: yup.string().min(3).required("Required"),
    lastname: yup.string().min(3).required("Required"),
  }),

  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
});

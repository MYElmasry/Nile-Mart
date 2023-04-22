import * as yup from "yup";

export const addProductSchema = yup.object().shape({
  title: yup.string().min(10).required("Required"),
  description: yup.string().min(10).required("Required"),
  price: yup.number().positive().required("Required"),
  image: yup.required("Required"),
});

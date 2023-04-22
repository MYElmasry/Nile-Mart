import * as yup from "yup";
export const reviewSchema = yup.object().shape({
  myReview: yup.string().min(20).required("Required"),
  myRate: yup.number().positive().integer().required("required"),
});

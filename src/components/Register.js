import "./Register.scss";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../rtk/slices/users-slice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { registerSchema } from "./schemas/registerSchema";

function Register() {
  const { enqueueSnackbar } = useSnackbar();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    dispatch(addUser(values));
    actions.resetForm();
    enqueueSnackbar("Successfully Registered", {
      variant: "success",
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });
    localStorage.getItem("email") === "admin"
      ? navigate("/dashboard")
      : navigate("/login");
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        name: {
          firstname: "",
          lastname: "",
        },
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  const navigate = useNavigate();

  const FirstNameErrorMessage = () => {
    return (
      <p className="FieldError absolute -bottom-2.5">
        First name should have at least 3 characters
      </p>
    );
  };
  const LastNameErrorMessage = () => {
    return (
      <p className="FieldError absolute -bottom-2.5">
        Last name should have at least 3 characters
      </p>
    );
  };
  const PasswordErrorMessage = () => {
    return <p className="FieldError absolute -bottom-2.5">{errors.password}</p>;
  };
  const InvalidEmailErrorMessage = () => {
    return (
      <p className="FieldError absolute -bottom-2.5">
        {values.email
          ? `Please enter invalid email ${values.email} is not valid`
          : `Email address is required`}
      </p>
    );
  };
  const EmailExistErrorMessage = () => {
    return (
      <p className="FieldError absolute -bottom-2.5">
        account already exists with the email address <b>{values.email}</b>
      </p>
    );
  };
  const findEmail = (email) => users.some((user) => user.email === email);

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="mt-3 w-full md:w-2/5 "
      >
        <fieldset className="flex flex-col rounded-md p-4 w-full m-0 bg-white">
          <h2>Sign Up</h2>
          <div className="Field relative flex flex-col pb-5">
            <label className="mb-2" htmlFor="firstName">
              First name <sup>*</sup>
            </label>
            <input
              className="rounded-md h-8"
              type="text"
              id="firstname"
              name="name.firstname"
              placeholder="First name"
              value={values.name.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name?.firstname && touched.name?.firstname ? (
              <FirstNameErrorMessage />
            ) : null}
          </div>
          <div className="Field relative flex flex-col pb-5">
            <label className="mb-2" htmlFor="lastName">
              Last name
            </label>
            <input
              className="rounded-md h-8"
              type="text"
              id="lastname"
              name="name.lastname"
              placeholder="Last name"
              value={values.name.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name?.lastname && errors.name?.lastname ? (
              <LastNameErrorMessage />
            ) : null}
          </div>
          <div className="Field relative flex flex-col pb-5">
            <label className="mb-2" htmlFor="email">
              Email address <sup>*</sup>
            </label>
            <input
              className="rounded-md h-8"
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <InvalidEmailErrorMessage />
            ) : null}
            {findEmail(values.email) && touched.email ? (
              <EmailExistErrorMessage />
            ) : null}
          </div>
          <div className="Field relative flex flex-col pb-5">
            <label className="mb-2" htmlFor="password">
              Password <sup>*</sup>
            </label>
            <input
              className="rounded-md h-8"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <PasswordErrorMessage />
            ) : null}
          </div>
          <button
            className="w-full cursor-pointer font-bold uppercase rounded-md disabled:cursor-not-allowed register-button"
            type="submit"
            disabled={
              Object.keys(errors).length !== 0 ||
              Object.keys(touched).length === 0 ||
              findEmail(values.email)
            }
          >
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;

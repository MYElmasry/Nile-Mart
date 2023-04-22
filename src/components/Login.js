import "./Login.scss";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

function Login({ handleLogin }) {
  const onSubmit = (values, actions) => {
    const user = users.find((user) => user.email === values.email);

    if (!user || user.password !== values.password) {
      values.exist = false;
    } else {
      values.exist = true;
      localStorage.setItem("firstName", user.name.firstname);
      localStorage.setItem("lastName", user.name.lastname);
      localStorage.setItem("email", user.email);
      localStorage.setItem("password", user.password);
      actions.resetForm();
      handleLogin();
      navigate("/");
    }
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      exist: true,
      email: "",
      password: "",
    },

    onSubmit,
  });

  const navigate = useNavigate();
  const users = useSelector((state) => state.users);

  return (
    <div className="flex items-center flex-col">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="mt-3 w-full md:w-2/5 "
      >
        <fieldset className="flex flex-col rounded-md p-4 w-full m-0 bg-white">
          <h2>Login</h2>
          <div className="Field relative flex flex-col pb-5">
            <label className="mb-2" htmlFor="email">
              Email address <sup>*</sup>
            </label>
            <input
              className="rounded-md h-8"
              data-testid="email"
              id="login-email"
              placeholder="Email address"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="Field relative flex flex-col pb-5">
            <label className="mb-2" htmlFor="password">
              Password <sup>*</sup>
            </label>
            <input
              className="rounded-md h-8"
              data-testid="password"
              id="login-password"
              placeholder="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {!values.exist && (
              <p
                className="FieldError absolute -bottom-2.5"
                data-testid="fieldError"
              >
                Wrong Email Or Password
              </p>
            )}
          </div>
          <button
            className="w-full cursor-pointer font-bold uppercase rounded-md login-button"
            type="submit"
            data-testid="login"
          >
            Login
          </button>
        </fieldset>
      </form>
      <Link to={"/register"} className="w-full md:w-2/5">
        <button className="mt-5 w-full p-3 shadow-md">
          Create your Nile Mart account
        </button>
      </Link>
    </div>
  );
}
export default Login;

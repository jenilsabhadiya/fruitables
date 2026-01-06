import React, { useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  RegisterUser,
  loginUser,
  verifyOtp,
} from "../../redux/slice/auth.slice";
import signup from "../../../public/assets/img/signup.jpg";
import login from "../../../public/assets/img/login.jpg";
import forgot from "../../../public/assets/img/Data_security_01.jpg";
import { useNavigate } from "react-router-dom";
// import { useSnackbar } from "notistack";

function Auth() {
  const [type, setType] = useState("login");
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();

  const user = useSelector((state) => state.auth);
  // console.log(user);

  const nav = useNavigate();

  let initialValues = {};
  let formikSchema = {};

  if (type === "login") {
    initialValues = {
      email: "",
      password: "",
    };

    formikSchema = {
      email: string().required("Email is required").email("Invalid email"),
      password: string().required("Password is required"),
    };
  } else if (type === "register") {
    initialValues = {
      name: "",
      email: "",
      password: "",
    };

    formikSchema = {
      name: string().required("Name is required"),
      email: string().required("Email is required").email("Invalid email"),
      password: string().required("Password is required"),
    };
  } else if (type === "forgot") {
    initialValues = {
      email: "",
    };

    formikSchema = {
      email: string().required("Email is required").email("Invalid email"),
    };
  } else if (type === "otp") {
    initialValues = {
      otp: "",
    };

    formikSchema = {
      otp: string().required(),
    };
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: object(formikSchema),
    onSubmit: async (values) => {
      if (type === "register") {
        let res = await dispatch(RegisterUser({ ...values, role: "user" }));

        if (res.type === "auth/RegisterUser/fulfilled") {
          // enqueueSnackbar("Registration successful! Please enter OTP.", {
          //   variant: "success",
          // });
          setType("otp");
        }
      } else if (type === "login") {
        let res = await dispatch(loginUser(values));

        if (res.type === "auth/loginUser/fulfilled") {
          // enqueueSnackbar("Login successful!", {
          //   variant: "success",
          // });
          nav("/");
        } else {
          // enqueueSnackbar("Login failed. Please check your Email/Password.", {
          //   variant: "error",
          // });
        }
      } else if (type === "otp") {
        let res = await dispatch(verifyOtp(values));

        if (res.type === "auth/verifyOtp/fulfilled") {
          // enqueueSnackbar("OTP verified successfully!", { variant: "success" });
          setType("login");
        } else {
          // enqueueSnackbar("otp failed. Please check your Email.", {
          //   variant: "error",
          // });
        }
      } else if (type === "forgot") {
        // enqueueSnackbar("Password reset link sent (mock).", {
        //   variant: "info",
        // });
        dispatch(values);
      }
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    formik;

  if (user?.isLongin) {
    return (
      <div
        id="spinner"
        className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center"
      >
        <div className="spinner-grow text-primary" role="status" />
      </div>
    );
  }

  return (
    <div>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6 capitalize">{type}</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active text-white capitalize">
            {type}
          </li>
        </ol>
      </div>

      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                  <h1 className="text-primary mb-4 capitalize">{type}</h1>
                </div>
              </div>

              {user?.error ? <p className="error">{user?.error}</p> : null}

              <div className="col-lg-7">
                <form onSubmit={handleSubmit}>
                  {type === "otp" ? (
                    <>
                      <input
                        type="number"
                        name="otp"
                        className="w-100 form-control border-0 py-3 mb-3"
                        placeholder="Enter Your otp"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.otp}
                      />
                      {touched.otp && errors.otp && (
                        <div className="text-danger mb-2">{errors.otp}</div>
                      )}
                    </>
                  ) : (
                    <>
                      {type === "register" && (
                        <>
                          <input
                            type="text"
                            name="name"
                            className="w-100 form-control border-0 py-3 mb-3"
                            placeholder="Your Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                          />
                          {touched.name && errors.name && (
                            <div className="text-danger mb-2">
                              {errors.name}
                            </div>
                          )}
                        </>
                      )}

                      {(type === "login" ||
                        type === "register" ||
                        type === "forgot") && (
                        <>
                          <input
                            type="email"
                            name="email"
                            className="w-100 form-control border-0 py-3 mb-3"
                            placeholder="Enter Your Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          {touched.email && errors.email && (
                            <div className="text-danger mb-2">
                              {errors.email}
                            </div>
                          )}
                        </>
                      )}

                      {(type === "login" || type === "register") && (
                        <>
                          <input
                            type="password"
                            name="password"
                            className="w-100 form-control border-0 py-3 mb-3"
                            placeholder="Enter Your Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          {touched.password && errors.password && (
                            <div className="text-danger mb-2">
                              {errors.password}
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}

                  <button
                    className="w-100 btn form-control border-secondary py-3 bg-white text-primary capitalize"
                    type="submit"
                  >
                    {type}
                  </button>
                </form>

                <div className="mt-4">
                  {type === "login" && (
                    <>
                      <p>
                        Forgot your password?{" "}
                        <a href="#" onClick={() => setType("forgot")}>
                          Click here
                        </a>
                      </p>
                      <p>
                        Don't have an account?{" "}
                        <a href="#" onClick={() => setType("register")}>
                          Register
                        </a>
                      </p>
                    </>
                  )}

                  {type === "register" && (
                    <p>
                      Already have an account?{" "}
                      <a href="#" onClick={() => setType("login")}>
                        Login
                      </a>
                    </p>
                  )}

                  {type === "forgot" && (
                    <p>
                      Remember your password?{" "}
                      <a href="#" onClick={() => setType("login")}>
                        Login
                      </a>
                    </p>
                  )}
                </div>
              </div>

              <div className="col-lg-5 text-center">
                <img
                  src={
                    type === "login"
                      ? login
                      : type === "register"
                      ? signup
                      : forgot
                  }
                  alt="avatar"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

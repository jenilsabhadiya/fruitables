import React, { useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";

function Auth() {
  const [type, setType] = useState("login");

  let initialValues = {};
  let formikSchema = {};

  if (type === "login") {
    initialValues = {
      email: "",
      password: "",
    };

    formikSchema = {
      email: string().required().email(),
      password: string().required(),
    };
  } else if (type === "register") {
    initialValues = {
      name: "",
      email: "",
      password: "",
    };

    formikSchema = {
      name: string().required(),
      email: string().required().email(),
      password: string().required(),
    };
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: object(formikSchema),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    formik;

  console.log("login");

  return (
    <div>
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">
          {type === "login" ? "Login" : "Register"}
        </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">{type === "login" ? "Login" : "Register"}</a>
          </li>
        </ol>
      </div>
      {/* Single Page Header End */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                  <h1 className="text-primary">
                    {type === "login" ? "Login" : "Register"}
                  </h1>
                </div>
              </div>
              <div className="col-lg-7">
                <form onSubmit={handleSubmit}>
                  {type === "register" ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        className="w-100 form-control border-0 py-3 mb-4"
                        placeholder="Your Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {touched.name && errors.name ? (
                        <span className="error">{errors.name}</span>
                      ) : null}
                    </>
                  ) : (
                    ""
                  )}

                  <input
                    type="email"
                    name="email"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {touched.email && errors.email ? (
                    <span className="error">{errors.email}</span>
                  ) : null}
                  <input
                    type="password"
                    name="password"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Enter Your Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password && errors.password ? (
                    <span className="error">{errors.password}</span>
                  ) : null}
                  <button
                    className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                    type="submit"
                  >
                    {type === "login" ? "Login" : "Register"}
                  </button>
                </form>

                {type === "login" ? (
                  <>
                    <span>Create an account: </span>
                    <a href="#" onClick={() => setType("register")}>
                      Register
                    </a>
                  </>
                ) : (
                  <>
                    <span>Already have an account ?</span>
                    <a href="#" onClick={() => setType("login")}>
                      Login
                    </a>
                  </>
                )}
              </div>
              <div className="col-lg-5">
                <img src="../../../public/assets/img/avatar.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

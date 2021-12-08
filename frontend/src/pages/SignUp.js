import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const validationSchema = Yup.object({
    Fullname: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    Email: Yup.string().email("Invalid email address").required("Required"),
    Password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("Please Enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      Fullname: "",
      Email: "",
      Password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="container mx-auto" style={{ width: "400px" }}>
      <form onSubmit={formik.handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="Fullname"
          >
            Fullname
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Fullname"
            type="text"
            placeholder="Fullname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Fullname}
          />
       
          {formik.touched.Fullname && formik.errors.Fullname ? (
         <div className="text-red-500 text-sm">{formik.errors.Fullname}</div>
       ) : null}

        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="Email">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Email"
            type="text"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Email}
          />

{ formik.errors.Email ? (
         <div className="text-red-500 text-sm">{formik.errors.Email}</div>
       ) : null}

        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="Password"
            type="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Password}
          />

{formik.touched.Password && formik.errors.Password ? (
         <div className="text-red-500 text-sm">{formik.errors.Password}</div>
       ) : null}

        </div>
        <div class="flex items-center justify-between">
          
          <button
            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          
        </div>
      </form>
      <div class="bg-white shadow-md rounded px-8 pt-3 pb-3 mb-4">
        <h1 className="text-gray-400 text-sm ">
          Already a user ?{" "}
          <Link to="/signin" className="text-blue-700">
            sign In
          </Link>
        </h1>
      </div>
      <p class="text-center text-gray-500 text-xs">
        &copy;2021 Pizza Corp. All rights reserved.
      </p>
    </div>
  );
};

export default SignUp;

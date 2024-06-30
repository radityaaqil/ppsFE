"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import * as Yup from "yup";
import Swal from "sweetalert2";

const Register = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, "Must contain 100 characters or less")
        .required("Required"),
      email: Yup.string()
        .email()
        .max(100, "Must contain 100 characters or less")
        .required("Required"),
      password: Yup.string()
        .min(8, "Must contain 8 characters or more")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        let res = await axios.post(
          `http://localhost:8080/user/register`,
          values
        );

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.data.message,
        });

        router.push("/verify");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        console.log(error);
      }
    },
  });

  return (
    <div className="bg-gradient-to-r from-[#035B71] to-[#00A2B9] min-h-screen pb-10">
      <div className="pt-40">
        <div className="flex justify-center">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-[573px] h-[660px] bg-white bg-opacity-15 rounded-3xl">
              <div className="pt-10 flex justify-center">
                <img src="./iture.png" className="w-[167px] h-[72px]" />
              </div>
              <div className="flex justify-center pt-10">
                <div>
                  <input
                    className="focus:ring-4 focus:ring-[#035B71] w-[475px] h-[60px] rounded-3xl px-4 focus:outline-none"
                    type="text"
                    placeholder="Username"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="flex justify-center pt-2">
                      <p className="text-lg pl-3 bg-red-500 text-white rounded-xl font-bold w-[475px]">
                        {formik.errors.name}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-center pt-6">
                <div>
                  <input
                    className="focus:ring-4 focus:ring-[#035B71] w-[475px] h-[60px] rounded-3xl px-4 focus:outline-none"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="flex justify-center pt-2">
                      <p className="text-lg pl-3 bg-red-500 text-white rounded-xl font-bold w-[475px]">
                        {formik.errors.email}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-center pt-6">
                <div>
                  <input
                    className="focus:ring-4 focus:ring-[#035B71] w-[475px] h-[60px] rounded-3xl px-4 focus:outline-none"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="flex justify-center pt-2">
                      <p className="text-lg pl-3 bg-red-500 text-white rounded-xl font-bold w-[475px]">
                        {formik.errors.password}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-center pt-8">
                <button
                  type="submit"
                  className="w-[170px] h-[70px] hover:duration-200 bg-[#FFE100] text-[#035B71] text-2xl font-bold rounded-2xl hover:ring-4 hover:ring-[#035B71]"
                >
                  Register
                </button>
              </div>
              <div className="flex justify-center pt-6">
                <div className="text-white">
                  Already have an account?{" "}
                  <span className="underline">
                    <Link href={"/"}>Login</Link>
                  </span>{" "}
                  here!
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import * as Yup from "yup";
import Swal from "sweetalert2";

export default function Home() {
  const [successLogin, setSuccessLogin] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .max(100, "Must contain 100 characters or less")
        .required("Required"),
      password: Yup.string()
        .min(8, "Must contain 8 characters or more")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        let res = await axios.post(`http://localhost:8080/user/login`, values);
        let headerToken = res.headers.authorization;
        let token = headerToken.split(" ")[1];

        if (!res.data.success) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }

        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: res.data.message,
          });
          Cookies.set("token", token);
          setSuccessLogin(true);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (successLogin == true) {
    router.push("/dashboard");
  }
  return (
    <div className="bg-gradient-to-r from-[#035B71] to-[#00A2B9] min-h-screen">
      <div className="pt-40">
        <div className="flex justify-center">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-[573px] h-[580px] bg-white bg-opacity-15 rounded-3xl">
              <div className="pt-10 flex justify-center">
                <img src="./iture.png" className="w-[167px] h-[72px]" />
              </div>
              <div className="flex justify-center pt-10">
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className="focus:ring-4 focus:ring-[#035B71] w-[475px] h-[60px] rounded-3xl px-4 focus:outline-none"
                  type="text"
                  placeholder="Email or username"
                  name="username"
                />
              </div>
              {formik.touched.username && formik.errors.username ? (
                <div className="flex justify-center pt-2">
                  <p className="text-lg pl-3 bg-red-500 text-white rounded-xl font-bold w-[475px]">
                    {formik.errors.username}
                  </p>
                </div>
              ) : null}
              <div className="flex justify-center pt-6">
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="focus:ring-4 focus:ring-[#035B71] w-[475px] h-[60px] rounded-3xl px-4 focus:outline-none"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="flex justify-center pt-2">
                  <p className="text-lg pl-3 bg-red-500 text-white rounded-xl font-bold w-[475px]">
                    {formik.errors.password}
                  </p>
                </div>
              ) : null}
              <div className="flex justify-center pt-8">
                <button
                  type="submit"
                  className="w-[170px] h-[70px] hover:duration-200 bg-[#FFE100] text-[#035B71] text-2xl font-bold rounded-2xl hover:ring-4 hover:ring-[#035B71]"
                >
                  Sign In
                </button>
              </div>
              <div className="flex justify-center pt-10">
                <div className="text-white">
                  Don't have an account?{" "}
                  <span className="underline">
                    <Link href={"/register"}>Register</Link>
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
}

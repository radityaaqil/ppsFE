"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Verification = ({ params }) => {
  let token = params.token;
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const VerifyAccount = async () => {
    try {
      let res = await axios.get(`http://localhost:8080/user/verification`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setSuccess(true);
        Cookies.set("token", token);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    VerifyAccount();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#00A2B9] to-[#035B71] min-h-screen">
      <div className="pt-56 flex justify-center">
        <div>
          <img src="./iture.png" className="w-[300px]" />
          <div className="text-4xl text-white font-bold pt-6">
            {success
              ? "Your email has been successfully verified!"
              : "Something went wrong :("}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;

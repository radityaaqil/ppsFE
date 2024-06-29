"use client";

import Navbar from "@/components/navbar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const UserRoleCheck = () => {
    let token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.name);
    if (decodedToken.role == "ADMIN") {
      router.push("/admin/program");
    }
  };

  useEffect(() => {
    UserRoleCheck();
  }, []);

  return (
    <div>
      <Navbar name={username} />
      <div className="flex justify-center text-4xl font-bold pt-10">
        This is User's Dashboard
      </div>
    </div>
  );
};

export default Dashboard;

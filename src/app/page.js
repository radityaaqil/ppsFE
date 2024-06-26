import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-[#035B71] to-[#00A2B9] min-h-screen">
      <div className="pt-40">
        <div className="flex justify-center">
          <div className="w-[573px] h-[515px] bg-white bg-opacity-15 rounded-3xl">
            <div className="pt-10 flex justify-center">
              <img src="./iture.png" className="w-[167px] h-[72px]" />
            </div>
            <div className="flex justify-center pt-10">
              <input
                className="focus:ring-4 focus:ring-[#035B71] w-[475px] h-[60px] rounded-3xl px-4 focus:outline-none"
                type="text"
                placeholder="Email or username"
              />
            </div>
            <div className="flex justify-center pt-6">
              <input
                className="focus:ring-4 focus:ring-[#035B71] w-[475px] h-[60px] rounded-3xl px-4 focus:outline-none"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-center pt-8">
              <button className="w-[170px] h-[70px] hover:duration-200 bg-[#FFE100] text-[#035B71] text-2xl font-bold rounded-2xl hover:ring-4 hover:ring-[#035B71]">
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
        </div>
      </div>
    </div>
  );
}

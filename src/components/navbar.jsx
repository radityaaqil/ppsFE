import { FaC, FaCircleUser } from "react-icons/fa6";

const Navbar = ({ name }) => {
  return (
    <div className="h-[109px] bg-white">
      <div className="mx-20">
        <div className="flex justify-between pt-6 items-center">
          <div>
            <img src="/iture.png" className="h-[50px]" />
          </div>
          <div className="flex items-center space-x-5 text-black">
            <div>{name}</div>
            <div className="text-3xl text-primary">
              <FaCircleUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

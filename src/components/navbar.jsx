const Navbar = () => {
  return (
    <div className="h-[109px] bg-white">
      <div className="mx-20">
        <div className="flex justify-between pt-6 items-center">
          <div>
            <img src="/iture.png" className="h-[50px]" />
          </div>
          <div className="flex space-x-5 text-black">
            <div>Profile Name</div>
            <div>Profile Image</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

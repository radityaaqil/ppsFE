import Navbar from "@/components/navbar";

const Program = () => {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        {/* Navbar */}
        <div>
          <Navbar />
        </div>

        {/* Content */}
        <div className="mx-20">
          <div className="bg-white h-[801px] mt-10 rounded-2xl">
            <div className="text-4xl font-bold mx-12 pt-10 text-black">
              Dashboard Program
            </div>
            <div className="mt-20 mx-12">
              <div className="grid grid-cols-3 justify-between gap-y-24">
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="radial-progress text-primary"
                    style={{
                      "--value": "70",
                      "--size": "10rem",
                      "--thickness": "1rem",
                    }}
                    role="progressbar"
                  >
                    70%
                  </div>
                  <div className="text-center text-black font-bold text-xl">
                    Program Title
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="radial-progress text-primary"
                    style={{
                      "--value": "70",
                      "--size": "10rem",
                      "--thickness": "1rem",
                    }}
                    role="progressbar"
                  >
                    70%
                  </div>
                  <div className="text-center text-black font-bold text-xl">
                    Program Title
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="radial-progress text-primary"
                    style={{
                      "--value": "70",
                      "--size": "10rem",
                      "--thickness": "1rem",
                    }}
                    role="progressbar"
                  >
                    70%
                  </div>
                  <div className="text-center text-black font-bold text-xl">
                    Program Title
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="radial-progress text-primary"
                    style={{
                      "--value": "70",
                      "--size": "10rem",
                      "--thickness": "1rem",
                    }}
                    role="progressbar"
                  >
                    70%
                  </div>
                  <div className="text-center text-black font-bold text-xl">
                    Program Title
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="radial-progress text-primary"
                    style={{
                      "--value": "70",
                      "--size": "10rem",
                      "--thickness": "1rem",
                    }}
                    role="progressbar"
                  >
                    70%
                  </div>
                  <div className="text-center text-black font-bold text-xl">
                    Program Title
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="radial-progress text-primary"
                    style={{
                      "--value": "70",
                      "--size": "10rem",
                      "--thickness": "1rem",
                    }}
                    role="progressbar"
                  >
                    70%
                  </div>
                  <div className="text-center text-black font-bold text-xl">
                    Program Title
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Program;

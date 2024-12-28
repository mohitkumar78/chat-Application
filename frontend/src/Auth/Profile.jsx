import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
function Profile() {
  const [hover, setHover] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center gap-10 flex-col">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max ">
        <diV>
          <IoArrowBack className="text-4xl cursor-pointer lg:text-6xl text-white/90" />
        </diV>
        <div className="grid grid-cols-2 ">
          <div
            className="relative items-center justify-center w-32 h-full md:h-48"
            onMouseEnter={setHover(true)}
            onMouseLeave={setHover(fasle)}
          ></div>
        </div>
      </div>
      Profile
    </div>
  );
}

export default Profile;

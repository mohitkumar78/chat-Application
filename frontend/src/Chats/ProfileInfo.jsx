import React from "react";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { useSelector } from "react-redux";
import { getColor } from "@/Utils/Utils";
import {
  TooltipProvider,
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from "../components/ui/tooltip";
function ProfileInfo() {
  const { user } = useSelector((store) => store.auth);
  console.log("User Data:", user); // Check if user data is available

  // Ensure user exists before rendering
  if (!user) return null;

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#212b33] shadow-lg">
      <div className="flex items-center gap-3">
        <Avatar className="w-14 h-14 flex-shrink-0 rounded-full shadow-md border-4 border-[#f03a17] flex items-center justify-center bg-gray-700">
          {user?.image ? (
            <AvatarImage
              src={user.image}
              alt="profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <div
              className={`flex items-center justify-center w-full h-full text-white font-semibold text-sm ${getColor(
                user?.color
              )}`}
            >
              {user?.firstname && user?.lastname
                ? `${user.firstname} ${user.lastname}`
                : user?.email?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
        </Avatar>
      </div>
      <div>
        {user?.firstname && user?.lastname
          ? `${user.firstname} ${user.lastname}`
          : ""}
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileInfo;

import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSelector } from "react-redux";

import { setChatType, setSelectedChatData } from "@/Store/contact-slice.js";
function CreateChaneel() {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const [openNewContactModel, setOpenNewContactModel] = useState(false);

  useEffect(() => {
    const getAllContact = async () => {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/getAllContact",
        {
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
    };
    getAllContact();
  });

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="transition-transform transform cursor-pointer hover:scale-110 text-neutral-400 hover:text-white"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none text-white mb-2 p-3 shadow-lg">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[450px] flex flex-col p-6 rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Create a Channel
            </DialogTitle>
          </DialogHeader>

          {/* Search Input */}
          <div className="mt-4">
            <Input
              placeholder="Search Contact"
              className="w-full rounded-lg px-4 py-3 border border-[#2c2b3e] bg-[#2c2b3e] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              onChange={(e) => SearchContacts(e.target.value)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateChaneel;

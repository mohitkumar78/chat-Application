import React, { useState } from "react";
import Lottie from "react-lottie";
import { animationDefaultOption } from "../Utils/Utils.js";
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

function NewDm() {
  const { token } = useSelector((store) => store.auth);
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchContact, setSearchContact] = useState([]);

  const SearchContacts = async (searchTerm) => {
    // Add logic to fetch contacts based on searchTerm
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/contact",
        {
          token,
          searchTerm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log("error is occur in search contact", error);
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="transition-all duration-300 cursor-pointer text-neutral-400 text-opacity-90 text-start hover:text-neutral-100"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none text-white mb-2 p-3">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[450px] flex flex-col p-5 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Please Select Contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          {/* Search Input */}
          <div className="mt-4">
            <Input
              placeholder="Search Contact"
              className="w-full rounded-lg p-3 border border-[#2c2b3e] bg-[#2c2b3e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => SearchContacts(e.target.value)}
            />
          </div>

          {/* Lottie Animation when no contacts are found */}
          {searchContact.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 transition-opacity duration-500">
              <Lottie
                isClickToPauseDisabled={true}
                height={200}
                width={200}
                options={animationDefaultOption}
              />
              <div className="mt-6 text-xl text-center text-white text-opacity-80 lg:text-2xl">
                <h3 className="font-medium">
                  Hi <span className="text-purple-500">!</span> Search New{" "}
                  <span className="text-purple-500">Contacts.</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewDm;

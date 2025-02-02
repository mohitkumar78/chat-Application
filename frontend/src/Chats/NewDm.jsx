import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
function NewDm() {
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="font-light transition-all duration-300 cursor-pointer text-neutral-400 text-opacity-90 text-start hover:text-neutral-100"
              onClick={setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none text-white mb-2 p-3">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default NewDm;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CreateChannel() {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const [openNewChannelModel, setOpenNewChannelModel] = useState(false);
  const [allOptions, setAllOptions] = useState([]); // Store original list
  const [selectedOptions, setSelectedOptions] = useState([]); // Selected contacts
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getAllContact = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/users/getAllContact",
          { token },
          { headers: { "Content-Type": "application/json" } }
        );
        setAllOptions(response.data.contacts); // Store all contacts
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getAllContact();
  }, [token]);

  // Handle selection of contacts
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  // Handle removal of selected contacts
  const removeSelectedOption = (option) => {
    setSelectedOptions((prev) =>
      prev.filter((opt) => opt.value !== option.value)
    );
  };

  return (
    <div>
      {/* Tooltip + Create Channel Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="transition-transform transform cursor-pointer hover:scale-125 text-neutral-400 hover:text-white"
              onClick={() => setOpenNewChannelModel(true)}
              size={20}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none text-white mb-2 p-3 shadow-lg rounded-md">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Dialog for Channel Creation */}
      <Dialog open={openNewChannelModel} onOpenChange={setOpenNewChannelModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[500px] flex flex-col p-6 rounded-xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Create a Channel
            </DialogTitle>
          </DialogHeader>

          {/* Channel Name Input */}
          <div className="mt-4">
            <Input
              placeholder="Enter Channel Name"
              className="w-full rounded-lg px-4 py-3 border border-[#2c2b3e] bg-[#2c2b3e] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>

          {/* Contact Selection */}
          <div className="mt-4">
            <Select
              options={allOptions}
              isMulti
              value={selectedOptions}
              onChange={handleChange}
              placeholder="Select contacts..."
              classNamePrefix="custom-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#2c2b3e",
                  borderColor: "#2c2b3e",
                  color: "white",
                  padding: "5px",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#2c2b3e",
                }),
                option: (base, { isFocused, isSelected }) => ({
                  ...base,
                  backgroundColor: isSelected
                    ? "#4a4b5e"
                    : isFocused
                    ? "#3a3b4d"
                    : "#2c2b3e",
                  color: "white",
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#3a3b4d",
                  borderRadius: "5px",
                  padding: "3px",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "500",
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "red",
                  cursor: "pointer",
                  ":hover": { backgroundColor: "darkred", color: "white" },
                }),
              }}
            />
          </div>

          {/* Selected Contacts */}
          <div className="mt-4">
            {selectedOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between px-3 py-2 mb-2 text-white bg-gray-800 rounded-md"
              >
                <span>{option.label}</span>
                <FaTimes
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => removeSelectedOption(option)}
                />
              </div>
            ))}
          </div>

          {/* Create Channel Button */}
          <div className="mt-6">
            <Button
              className="w-full py-3 text-lg font-semibold text-white transition-all duration-300 bg-purple-700 rounded-lg shadow-md hover:bg-purple-600 active:bg-purple-800"
              onClick={() =>
                console.log("Channel Created:", channelName, selectedOptions)
              }
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateChannel;

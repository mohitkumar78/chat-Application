import React, { useEffect } from "react";
import Logo from "@/Logo";
import Title from "@/Title";
import ProfileInfo from "./ProfileInfo";
import NewDm from "./NewDm";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setDirectContactList } from "../Store/contact-slice";
function Chat_contact() {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    const getContact = async () => {
      try {
        const response = axios.post(
          "http://localhost:4000/api/v1/users/getcontacts-for-dm",
          {
            token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response) {
          dispatch(setDirectContactList({ contacts: response.data.contacts }));
        }
        console.log(response);
      } catch (error) {
        console.log("error is occur in chat_contact", error);
      }
    };
    getContact();
  }, []);

  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r border-[#2f303b] h-screen flex flex-col">
      {/* Logo Section */}
      <div className="px-4 pt-4">
        <Logo />
      </div>

      {/* Direct Messages Section */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
        <div className="max-h-[38vh] scrollbar-hidden overflow-y-auto"></div>
      </div>

      {/* Channels Section */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-start">
          <Title text="Channels" />
        </div>
      </div>

      {/* Profile Info at Bottom */}
      <div className="mt-auto">
        <ProfileInfo />
      </div>
    </div>
  );
}

export default Chat_contact;

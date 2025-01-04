import React from "react";
import { useSelector } from "react-redux";

function Chat_Container() {
  const { user } = useSelector((store) => store.auth);
  console.log(user.firstname);
  return <div>Chat container</div>;
}

export default Chat_Container;

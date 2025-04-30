import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import useConversation from "../../statemanage/useConversation.js";
import { CiMenuFries } from "react-icons/ci";
import { useAuth } from "../../context/AuthProvider.jsx";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full h-screen bg-slate-900 text-gray-300 flex flex-col">
      {/* Now flex-col + full height (h-screen) */}
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="flex-none">
            <Chatuser />
          </div>

          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>

          <div className="flex-none">
            <Type />
          </div>
        </>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const { authUser } = useAuth();

  return (
    <div className="relative w-full h-full flex flex-col">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5 top-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-center">
          Welcome{" "}
          <span className="font-semibold text-xl">
            {authUser?.user?.fullname || "User"}
          </span>
          <br />
          No chat selected, please start a conversation.
        </h1>
      </div>
    </div>
  );
};

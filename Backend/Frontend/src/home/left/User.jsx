import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      onClick={() => setSelectedConversation(user)}
      className={`duration-300 cursor-pointer ${
        isSelected ? "bg-slate-700" : "hover:bg-slate-600"
      }`}
    >
      <div className="flex space-x-4 px-7 py-8 hover:bg-slate-700 duration-300 cursor-pointer">
      <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-14 rounded-full">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQEcUTOXa2bO3A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1697478775109?e=1747872000&v=beta&t=G9HachkXtky80H2M_n4mY3DZqa7aPddvA4pNgqnFeMY"
              alt="User Avatar"
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">{user.fullname}</h1>
          <span className="text-sm text-gray-400">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
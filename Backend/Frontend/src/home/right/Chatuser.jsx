import React from "react";
import useConversation from "../../statemanage/useConversation";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Chatuser() {
  const { selectedConversation } = useConversation();
  console.log(selectedConversation);
  const {  onlineUsers } = useSocketContext();
  const getOnlineUserstatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  }
  if (!selectedConversation) {
    return null; // or you can show a loading skeleton if you want
  }

  return (
    <>
      <div className="m-5 flex space-x-4 bg-gray-800 hover:bg-gray-700 p-2 rounded-lg">
        <div>
          {/* <div className={`avatar ${isOnline ? 'online' : ''}`}> */}
          <div className={'avatar online'}>
            <div className="w-14 rounded-full">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQEcUTOXa2bO3A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1697478775109?e=1747872000&v=beta&t=G9HachkXtky80H2M_n4mY3DZqa7aPddvA4pNgqnFeMY"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl">{selectedConversation.fullname}</h1>
          <span className="text-sm">{getOnlineUserstatus(selectedConversation._id)}</span>
        </div>
      </div>
    </>
  );
}

export default Chatuser;

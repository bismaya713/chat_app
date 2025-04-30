import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessages.js";

function Type() {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-slate-800 p-2 flex items-center gap-2 border-t border-slate-700">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type here..."
        className="flex-grow bg-slate-700 text-white p-2 rounded-md outline-none focus:ring-2 focus:ring-slate-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="text-3xl text-white hover:text-slate-400 transition"
      >
        <IoSendSharp />
      </button>
    </form>
  );
}

export default Type;

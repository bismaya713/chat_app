import React, { useRef, useEffect } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.jsx";

function Messages() {
  const { messages = [], loading } = useGetMessage(); // Default to empty array if undefined
  useGetSocketMessage(); // Call the socket message hook to listen for new messages
  console.log(messages);
  const lastMessage = useRef()
  useEffect(() => {
    setTimeout(() => {
      if (lastMessage.current) {
        lastMessage.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => {
          return <Message key={message._id} message={message} />;
        })
      )}

      <div className="" style={{ minHeight: "calc(88vh - 10vh)" }}>
        {!loading && messages.length === 0 && (
          <div>
            <p className="text-center mt-[20%]">Say Hii</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Messages;

import { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";

function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getMessages();
  }, [selectedConversation]);

  // Return loading state if needed
  return { messages, loading };
}

export default useGetMessage;

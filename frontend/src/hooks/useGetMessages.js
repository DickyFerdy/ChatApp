import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/messages/${selectedConversation.user_id}`);

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data);
      } catch (error) {
        toast.error(error.messages);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?.user_id) {
      getMessages();
    }
  }, [selectedConversation?.user_id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;

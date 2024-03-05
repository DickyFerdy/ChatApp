import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto pb-2">
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message.message_id} ref={lastMessageRef}>
          <Message key={message.message_id} message={message} />
        </div>
      ))}
    </div>
  )
};

export default Messages;

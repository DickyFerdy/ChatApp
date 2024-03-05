import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emoji";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation.user_id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length-1}
        />
      ))}

      {loading ? <span className="loading loading-spinner" /> : null}
    </div>
  )
};

export default Conversations;

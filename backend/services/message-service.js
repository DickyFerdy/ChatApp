import { logger } from "../application/logging.js";
import ResponseError from "../error/ResponseError.js";
import Conversation from "../models/conversation-model.js";
import Message from "../models/message-model.js";

const sendMessage = async (req, res, receiverId, senderId) => {
  try {
    const { message } = req;

    let conversation = await Conversation.getConversation(senderId, receiverId);
    const createdAt = new Date();

    if (!conversation) {
      conversation = await Conversation.createConversation(createdAt);
      const conversation_id = conversation.conversation_id;
      await Conversation.createConversationParticipant(conversation_id, senderId);
      await Conversation.createConversationParticipant(conversation_id, receiverId);
    }

    const newMessage = await Message.createMessage(senderId, receiverId, message, createdAt);

    if (newMessage) {
      await Conversation.createConversationMessage(conversation.conversation_id, newMessage.message_id);
    }

    return {
      message_id: newMessage.message_id,
      sender_id: newMessage.sender_id,
      receiver_id: newMessage.receiver_id,
      message: newMessage.message,
      created_at: newMessage.created_at
    }
  } catch (error) {
    logger.error(`Error in sendMessage service ${error.message}`);
    ResponseError(res, 500, 'Internal Server Error');
  }
};

const getMessage = async (res, receiverId, senderId) => {
  try {
    const conversation = await Message.getMessage(senderId, receiverId, receiverId, senderId);

    if (!conversation) {
      return res.status(200).json([]);
    }

    return conversation;
  } catch (error) {
    logger.error(`Error in getMessage service ${error.message}`);
    ResponseError(res, 500, 'Internal Server Error');
  }
};

export default {
  sendMessage,
  getMessage,
};

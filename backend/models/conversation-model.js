import { pool } from "../application/connection.js";
import conversationQueries from "./queries/conversation-queries.js";

class Conversation {
  constructor(user_id, conversation_id, username) {
    this._user_id = user_id;
    this._conversation_id = conversation_id;
    this._username = username;
  }

  static async getConversation(firstUserId, secondUserId) {
    const { rows } = await pool.query(conversationQueries.getConversation, [firstUserId, secondUserId]);
    return rows[0];
  };

  static async createConversation(date) {
    const { rows } = await pool.query(conversationQueries.createConversation, [date]);
    return rows[0];
  };

  static async createConversationParticipant(conversation_id, user_id) {
    await pool.query(conversationQueries.createConversationParticipant, [conversation_id, user_id]);
  };

  static async createConversationMessage(conversation_id, message_id) {
    await pool.query(conversationQueries.createConversationMessage, [conversation_id, message_id]);
  }
};

export default Conversation;

import { pool } from "../application/connection.js";
import messageQueries from "./queries/message-queries.js";

class Message {
  constructor(user_id, receiver_id, message, created_at) {
    this._user_id = user_id;
    this._receiver_id = receiver_id;
    this._message = message;
    this._created_at = created_at;
  }

  static async createMessage(sender_id, receiver_id, message, created_at) {
    const { rows } = await pool.query(messageQueries.createMessage, [sender_id, receiver_id, message, created_at]);
    return rows[0];
  };
};

export default Message;

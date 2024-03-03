const getConversation = 'SELECT c.* FROM conversation c JOIN conversation_participant cp1 ON c.conversation_id = cp1.conversation_id JOIN conversation_participant cp2 ON cp1.conversation_id = cp2.conversation_id WHERE cp1.user_id = $1 AND cp2.user_id = $2';

const createConversation = 'INSERT INTO conversation (created_at) VALUES ($1) returning *';

const createConversationParticipant = 'INSERT INTO conversation_participant (conversation_id, user_id) VALUES ($1, $2)';

const createConversationMessage = 'INSERT INTO conversation_message (conversation_id, message_id) VALUES ($1, $2)';

export default {
  getConversation,
  createConversation,
  createConversationParticipant,
  createConversationMessage
};

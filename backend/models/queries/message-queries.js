const createMessage = 'INSERT INTO message (sender_id, receiver_id, message, created_at) VALUES ($1, $2, $3, $4) returning *';

export default {
  createMessage,
};

const createMessage = 'INSERT INTO message (sender_id, receiver_id, message, created_at) VALUES ($1, $2, $3, $4) returning *';

const getMessage = 'SELECT * FROM message WHERE sender_id = $1 AND receiver_id = $2 OR sender_id = $3 AND receiver_id = $4';

export default {
  createMessage,
  getMessage,
};

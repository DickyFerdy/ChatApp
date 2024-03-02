const getUsername = 'SELECT username FROM "User" WHERE username = $1';

const signup = 'INSERT INTO "User" (username, full_name, password, gender, profile_pic, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

const getUser = 'SELECT user_id, username, full_name, password, profile_pic from "User" WHERE username = $1';

const getUserById = 'SELECT user_id, username, full_name, profile_pic from "User" WHERE user_id = $1';

export default {
  getUsername,
  signup,
  getUser,
  getUserById,
};

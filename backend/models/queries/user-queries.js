const getUsername = 'SELECT username FROM "User" WHERE username = $1';

const signup = 'INSERT INTO "User" (username, full_name, password, gender, profile_pic, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

const deleteByUsername = 'DELETE FROM "User" WHERE username = $1';

export default {
  getUsername,
  signup,
  deleteByUsername
};

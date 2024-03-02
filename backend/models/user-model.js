import { pool } from "../application/connection.js";
import userQueries from "./queries/user-queries.js";

class User {
  constructor(user_id, username, full_name, password, gender, profile_pic, created_at) {
    this._user_id = user_id;
    this._username = username;
    this._full_name = full_name;
    this._password = password;
    this._gender = gender;
    this._profile_pic = profile_pic;
    this._created_at = created_at;
  }

  static async getUsername(username) {
    const { rows } = await pool.query(userQueries.getUsername, [username]);
    return rows[0];
  };

  static async signup(username, full_name, password, gender, profile_pic, created_at) {
    const { rows } = await pool.query(userQueries.signup, [username, full_name, password, gender, profile_pic, created_at]);
    return rows[0];
  };

  static async getUser(username) {
    const { rows } = await pool.query(userQueries.getUser, [username]);
    return rows[0];
  };
};

export default User;

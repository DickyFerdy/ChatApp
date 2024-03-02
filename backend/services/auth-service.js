import bcrypt from "bcrypt";
import User from "../models/user-model.js";
import { boyProfilePic, girlProfilePic } from "../utils/profilePic.js";
import ResponseError from "../error/ResponseError.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { logger } from "../application/logging.js";

const signup = async (req, res) => {
  try {
    const { username, full_name, password, confirm_password, gender } = req;

    if (password !== confirm_password) {
      ResponseError(res, 400, "Passwords don't match");
    }
  
    const user = await User.getUsername(username);
  
    if (user) {
      ResponseError(res, 400, "Username already exists");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const boy = boyProfilePic(username);
    const girl = girlProfilePic(username);
  
    const profilePic = gender === "male" ? boy : girl;
    const createdAt = new Date();
  
    const newUser = await User.signup(username, full_name, hashedPassword, gender, profilePic, createdAt);
  
    if (newUser) {
      generateTokenAndSetCookie(newUser.user_id, res);
      return {
        user_id: newUser.user_id,
        username: newUser.username,
        full_name: newUser.full_name,
        profile_pic: newUser.profile_pic
      }
    }
  } catch (error) {
    logger.error(`Error in signup service ${error.message}`);
    ResponseError(res, 500, "Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req;
    
    const getUser = await User.getUser(username);
    
    if (!getUser) {
      ResponseError(res, 400, "Invalid username or password");
    }
    
    const checkPassword = await bcrypt.compare(password, getUser.password || "");

    if (!checkPassword) {
      ResponseError(res, 400, "Invalid username or password");
    }

    generateTokenAndSetCookie(getUser.user_id, res);

    return {
      user_id: getUser.user_id,
      username: getUser.username,
      full_name: getUser.full_name,
      profile_pic: getUser.profile_pic
    }
  } catch (error) {
    logger.error(`Error in login service ${error.message}`);
    ResponseError(res, 500, "Internal Server Error");
  }
};

const logout = (res) => {
  try {
    return {
      message: "Logged out successfully",
    };
  } catch (error) {
    logger.error(`Error in logout service ${error.message}`);
    ResponseError(res, 500, "Internal Server Error");
  }
};

export default {
  signup,
  login,
  logout,
};

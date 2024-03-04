import User from "../models/user-model.js";
import ResponseError from "../error/ResponseError.js";
import { logger } from "../application/logging.js";

const getUsersForSidebar = async (loggedInUserId, res) => {
  try {
    const getUsers = await User.getNonLoggedInUsers(loggedInUserId);
    
    return getUsers;
  } catch (error) {
    logger.error(`Error in getUsersForSidebar ${error.message}`);
    ResponseError(res, 500, "Internal Server Error");
  }
};

export default {
  getUsersForSidebar,
};

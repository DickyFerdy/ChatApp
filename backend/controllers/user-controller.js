import { logger } from "../application/logging.js";
import userService from "../services/user-service.js";

const getUsersForSidebar = async (req, res, next) => {
  try {
    const loggedInUserId = req.user.user_id;
    const result = await userService.getUsersForSidebar(loggedInUserId, res);
    logger.info(`${req.method} ${req.url}`);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getUsersForSidebar
};

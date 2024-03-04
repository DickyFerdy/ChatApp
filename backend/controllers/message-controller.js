import { logger } from "../application/logging.js";
import messageService from "../services/message-service.js";

const sendMessage = async (req, res, next) => {
  try {
    const request = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.user_id;
    const result = await messageService.sendMessage(request, res, receiverId, senderId);
    logger.info(`${req.method} ${req.url}`);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getMessage = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.user_id;
    const result = await messageService.getMessage(res, receiverId, senderId);
    logger.info(`${req.method} ${req.url}`);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  sendMessage,
  getMessage,
};

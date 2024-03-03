import { logger } from "../application/logging.js";
import authService from "../services/auth-service.js";

const signup = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await authService.signup(request, res);
    logger.info(`${req.method} ${req.url}`);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
};

const login = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await authService.login(request, res);
    logger.info(`${req.method} ${req.url}`);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    const result = authService.logout(res);
    logger.info(`${req.method} ${req.url}`);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  login,
  logout,
};

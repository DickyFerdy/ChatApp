import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import { logger } from "../application/logging.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized: No Token Provided"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        error: "Unauthorized: Invalid Token"
      });
    }

    const user = await User.getUserById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        error: "User is not found"
      });
    }

    req.user = user;

    next();
  } catch (error) {
    logger.error(`Error in protectRoute middleware ${error}`);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

export default protectRoute;

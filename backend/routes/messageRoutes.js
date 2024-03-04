import express from "express";
import messageController from "../controllers/message-controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/send/:id', protectRoute, messageController.sendMessage);
router.get('/:id', protectRoute, messageController.getMessage);

export default router;

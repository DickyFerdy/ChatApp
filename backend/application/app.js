import express from "express";
import cookieParser from "cookie-parser"; 
import authRouter from "../routes/authRoutes.js";
import messageRouter from "../routes/messageRoutes.js";
import userRouter from "../routes/userRoutes.js";
import { app, server } from "../socket/socket.js";
import dotenv from "dotenv";
import { logger } from "./logging.js";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
